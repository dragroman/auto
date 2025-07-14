// src/features/dcd-parser/lib/drupal-formatters.ts
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DCDCarData } from "../model/types"
import { drupal } from "@shared/lib/drupal"
import { convertMileageToMeters, convertFuelForm } from "./data-converters"
import { DrupalMedia } from "next-drupal"

/**
 * Извлекает ID бренда из Drupal по китайскому названию
 */
async function extractBrand(carBrand: string) {
  const params = new DrupalJsonApiParams()
    .addFields("taxonomy_term--brand", ["name", "field_name_chinese"])
    .addFilter("field_name_chinese", carBrand)

  const brand = await drupal.getResourceCollection("taxonomy_term--brand", {
    params: params.getQueryObject(),
  })

  if (brand.length === 0) {
    throw new Error(`Бренд "${carBrand}" не найден`)
  }

  return brand[0].id
}

/**
 * Форматирует изображения для Drupal
 */
function formatImages(images: DCDCarData["head_images"]) {
  if (!images || !Array.isArray(images)) return []

  return images.slice(0, 10).map((img, index) => ({
    url: img.pic_url,
    alt: img.tag_name || `Фото автомобиля ${index + 1}`,
    title: img.point_key || img.tag_name,
    weight: index,
  }))
}

/**
 * Создает описание автомобиля
 */
function createCarDescription(carData: DCDCarData): string {
  const features = []

  features.push(`Модель: ${carData.car_name}`)
  features.push(`Год выпуска: ${carData.year}`)
  features.push(`Пробег: ${carData.mileage} тыс. км`)
  features.push(`Город: ${carData.car_source_city_name}`)
  features.push(`Дилер: ${carData.shop_name}`)

  if (carData.fuel_form === 1) {
    features.push("Тип топлива: Бензин")
  } else if (carData.fuel_form === 2) {
    features.push("Тип топлива: Дизель")
  } else if (carData.fuel_form === 3) {
    features.push("Тип топлива: Электро")
  }

  return features.join("\n")
}

/**
 * Форматирует данные автомобиля для создания car info в Drupal
 */
export async function formatCarInfoData(carData: DCDCarData) {
  const brandId = await extractBrand(carData.brand_name)
  return {
    attributes: {
      title: carData.car_name,
      field_car_type: convertFuelForm(carData.fuel_form),
      field_configuration: carData.car_name,
      field_model: carData.car_name,
      field_configuration_en: carData.car_name,
      field_year: carData.year,
      field_capacity_ml: carData.engine_capacity,
      field_horsepower: 0,
      field_drive_mode: "",
    },
    relationships: {
      field_brand: {
        data: {
          type: "taxonomy_term--brand",
          id: brandId,
        },
      },
    },
  }
}

export function formatCarProductVariationData(carData: DCDCarData) {
  return {
    attributes: {
      sku: carData.sku_id,
      price: {
        number: "0",
        currency_code: "RUB",
      },
      field_additional_expenses: "0",
      field_domestic_shipping: "0",
      field_overall_profit: "0",
      field_price_actual: carData.price,
      field_price_retail: carData.price,
    },
  }
}

/**
 * Форматирует данные автомобиля для создания товара в Drupal
 */
export function formatCarProductData(
  carData: DCDCarData,
  carInfoId: string,
  carVariationId: string,
  carImages: Array<{ type: string; id: string }> = [],
  calculationNodeId: string
) {
  const relationships: any = {
    commerce_product_type: {
      data: {
        type: "commerce_product_type--commerce_product_type",
        id: "7528c976-b2a3-4968-b1f4-fe41f2c15bd9",
        meta: {
          drupal_internal__target_id: "car",
        },
      },
    },
    variations: {
      data: {
        type: "commerce_product_variation--car",
        id: carVariationId,
      },
    },
    stores: {
      data: {
        type: "commerce_store--online",
        id: "aaf9ade6-2f1e-484e-bc74-4106e2a104e1",
      },
    },
    field_car_info: {
      data: {
        type: "node--car",
        id: carInfoId,
      },
    },
    field_calculation: {
      data: {
        type: "node--calculation",
        id: calculationNodeId,
      },
    },
  }

  // Добавляем изображения если они есть
  if (carImages.length > 0) {
    relationships.field_images = {
      data: carImages,
    }
  }

  return {
    attributes: {
      title: `${carData.car_name}`,
      field_new: "0",
      field_production_date: carData.production_date,
      field_mileage: convertMileageToMeters(carData.mileage),
    },
    relationships,
  }
}

/**
 * Скачивает изображение по URL и возвращает Buffer
 */
async function downloadImageFromUrl(imageUrl: string): Promise<Buffer> {
  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`Ошибка загрузки изображения: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    console.error("Ошибка при скачивании изображения:", error)
    throw error
  }
}

/**
 * Создает массив media изображений из URL
 */
export async function createCarImages(
  carData: DCDCarData,
  accessToken: string
) {
  if (!carData.head_images || carData.head_images.length === 0) {
    return []
  }

  const carImages = []

  // Берем первые 10 изображений
  const imagesToProcess = carData.head_images.slice(0, 20)

  for (let i = 0; i < imagesToProcess.length; i++) {
    const image = imagesToProcess[i]

    try {
      // Скачиваем изображение
      const imageBuffer = await downloadImageFromUrl(image.pic_url)

      // Создаем file
      const file = await drupal.createFileResource(
        "file--file",
        {
          data: {
            attributes: {
              type: "media--car_image",
              field: "field_media_image",
              filename: `car_${carData.sku_id}_${i + 1}.jpg`,
              file: imageBuffer,
            },
          },
        },
        { withAuth: () => `Bearer ${accessToken}` }
      )

      // Создаем media
      const media = await drupal.createResource<DrupalMedia>(
        "media--car_image",
        {
          data: {
            attributes: {
              name: image.point_key || `Фото ${i + 1}`,
            },
            relationships: {
              field_media_image: {
                data: {
                  type: "file--file",
                  id: file.id,
                },
              },
            },
          },
        },
        { withAuth: () => `Bearer ${accessToken}` }
      )

      carImages.push({
        type: "media--car_image",
        id: media.id,
      })
    } catch (error) {
      console.error(`Ошибка создания изображения ${i + 1}:`, error)
      // Продолжаем с другими изображениями при ошибке
    }
  }

  return carImages
}
