// src/app/api/parser/dcd/route.ts
import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@features/auth/session"

import {
  DCDCarData,
  DCDApiResponse,
  ParserRequest,
  ParseResult,
  enrichCarData,
  logParsingStep,
  isValidDcdUrl,
  validateCarData,
  logParsingResult,
  extractSkuId,
  formatCarInfoData,
  formatCarProductData,
  formatCarProductVariationData,
  convertFuelForm,
  createCarImages,
} from "@features/dcd-parser"
import { drupal } from "@shared/lib/drupal"
import { DrupalMedia } from "next-drupal"

export async function POST(request: NextRequest) {
  try {
    const { url }: ParserRequest = await request.json()

    // Валидация URL
    if (!url || !isValidDcdUrl(url)) {
      return NextResponse.json(
        { error: "Неверный URL. Требуется ссылка на dcdapp.com с sku_id" },
        { status: 400 }
      )
    }

    // Проверка авторизации
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: "Необходима авторизация" },
        { status: 401 }
      )
    }

    console.log(
      `[PARSER] Начало парсинга URL: ${url} для пользователя ${session.user.id}`
    )

    // Парсим данные из DCD API
    const carData = await parseDCDUrl(url)

    // Валидация полученных данных
    const validationErrors = validateCarData(carData)

    if (validationErrors.length > 0) {
      logParsingResult(
        false,
        carData,
        `Ошибки валидации: ${validationErrors.join(", ")}`
      )
      return NextResponse.json(
        { error: `Неполные данные автомобиля: ${validationErrors.join(", ")}` },
        { status: 400 }
      )
    }

    console.log("[PARSER] Создание field_car_info...")
    const carInfoNodeId = await createCarInfoNode(carData, session.accessToken)

    // Создаем товар (commerce_product car)
    console.log("[PARSER] Создание вариации товара...")
    const carProductVariation = await createCarProductVariation(
      carData,
      session.accessToken
    )

    // Создаем товар (commerce_product car)
    console.log("[PARSER] Создание товара...")
    const carProduct = await createCarProduct(
      carData,
      carInfoNodeId,
      carProductVariation,
      session.accessToken
    )

    // Создаем расчет (node calculation)
    console.log("[PARSER] Создание расчета...")
    const calculationNode = await createCalculationNode(
      carData,
      session.accessToken
    )

    // Логируем успешный результат
    logParsingResult(true, carData)

    // Инвалидируем кеши
    revalidateTag("calculations")
    revalidateTag("cars")

    const result: ParseResult = {
      success: true,
      calculation: {
        id: calculationNode.id,
        title: calculationNode.title,
      },
      product_id: carProduct,
      message: `Автомобиль "${carData.brand_name} ${carData.series_name}" успешно добавлен`,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Ошибка парсера:", error)
    logParsingResult(
      false,
      undefined,
      error instanceof Error ? error.message : "Неизвестная ошибка"
    )

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Неизвестная ошибка",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.stack
              : undefined
            : undefined,
      },
      { status: 500 }
    )
  }
}

// Функция парсинга данных из DCD URL
async function parseDCDUrl(url: string): Promise<DCDCarData> {
  try {
    // Извлекаем sku_id из URL
    const skuId = extractSkuId(url)
    if (!skuId) {
      throw new Error("Не удалось найти sku_id в URL")
    }

    logParsingStep("Извлечен sku_id", skuId)

    // Формируем API URL для получения данных
    const apiUrl = `https://m.dcdapp.com/motor/sh_information/api/h5/sku_detail/full?sku_id=${skuId}&__method=window.fetch`

    console.log(`[PARSER] Запрос к API: ${apiUrl}`)

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9,ru;q=0.8,zh-CN;q=0.7,zh;q=0.6",
        Referer: "https://m.dcdapp.com/",
        "Cache-Control": "no-cache",
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: HTTP ${response.status}`)
    }

    const data: DCDApiResponse = await response.json()

    if (data.status !== 0) {
      throw new Error(
        `API ошибка: ${data.message || "Неизвестная ошибка сервера"}`
      )
    }

    if (!data.data || !data.data.common_info) {
      throw new Error("Получены неполные данные от API")
    }

    console.log(
      `[PARSER] Успешно получены данные для: ${data.data.common_info.brand_name} ${data.data.common_info.series_name}`
    )

    // Обогащаем базовые данные дополнительной информацией
    const enrichedCarData = enrichCarData(
      data.data.common_info,
      data.data.components
    )

    console.log(enrichedCarData)

    logParsingResult(true, enrichedCarData)
    return enrichedCarData
  } catch (error: any) {
    logParsingResult(false, undefined, error.message)
    throw error
  }
}

async function createCarInfoNode(carData: DCDCarData, accessToken: string) {
  const carInfoData = await formatCarInfoData(carData)

  const response = await drupal.createResource(
    "node--car",
    {
      data: carInfoData,
    },
    {
      withAuth: () => `Bearer ${accessToken}`,
    }
  )

  return response.id
}

// Создание commerce_product car
async function createCarProductVariation(
  carData: DCDCarData,
  accessToken: string
) {
  const data = formatCarProductVariationData(carData)

  const response = await drupal.createResource(
    "commerce_product_variation--car",
    {
      data: data,
    },
    { withAuth: () => `Bearer ${accessToken}` }
  )

  return response.id
}

// Создание commerce_product car
async function createCarProduct(
  carData: DCDCarData,
  carInfoId: string,
  carVariationId: string,
  accessToken: string
) {
  // Создаем изображения
  console.log("[PARSER] Создание изображений...")
  const carImages = await createCarImages(carData, accessToken)

  // Создаем товар с изображениями
  const data = formatCarProductData(
    carData,
    carInfoId,
    carVariationId,
    carImages
  )

  const response = await drupal.createResource(
    "commerce_product--car",
    {
      data: data,
    },
    { withAuth: () => `Bearer ${accessToken}` }
  )

  return response.id
}

// Создание node calculation
async function createCalculationNode(carData: DCDCarData, accessToken: string) {
  // Формируем данные для калькулятора из распарсенных данных автомобиля
  const calculationData = {
    new: false,
    production_date: carData.production_date,
    engine_type: convertFuelForm(carData.fuel_form),
    capacity_ml: carData.engine_capacity,
    horsepower: carData.horsepower,
    price_actual_rmb: carData.price,
    price_retail_rmb: carData.price,
    profit_rmb: 5000,
    domestic_shipping_rmb: 1500,
    additional_expenses_rmb: 0,
    inspection: 800,
    insurance: 1500,
    employeeTravelCost: 1000,
    brokerFee: 0.015,
  }

  // Вызываем готовый API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/v1/price-calculator`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // передай accessToken в параметрах функции
      },
      body: JSON.stringify(calculationData),
    }
  )

  if (!response.ok) {
    throw new Error(`Ошибка создания расчета: ${response.status}`)
  }

  return await response.json()
}
