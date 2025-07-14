// src/features/dcd-parser/lib/data-extractors.ts
import { DCDCarData } from "../model/types"

/**
 * Извлекает данные из компонентов API ответа
 */
export function extractDataFromComponents(components: any[]) {
  const result: any = {}

  // Ищем все нужные ключи одним проходом
  const searchKeys = [
    "price",
    "unit",
    "official_price",
    "important_param",
    "other_param",
    "shop_info",
    "head_images",
    "price_analysis",
  ]

  function searchInObject(obj: any, path: string = "") {
    if (typeof obj !== "object" || obj === null) return

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => searchInObject(item, `${path}[${index}]`))
      return
    }

    for (const key in obj) {
      if (searchKeys.includes(key) && !result[key]) {
        result[key] = obj[key]
      }
      searchInObject(obj[key], `${path}.${key}`)
    }
  }

  searchInObject(components)
  return result
}

/**
 * Извлекает sku_id из URL DCD
 */
export function extractSkuId(url: string): string | null {
  const match = url.match(/sku_id=(\d+)/)
  return match ? match[1] : null
}

/**
 * Извлекает дату производства из параметров автомобиля
 */
export function extractProductionDate(carOtherParams: any): string | null {
  try {
    // Ищем дату регистрации (上牌时间)
    const registrationParam = carOtherParams.find(
      (param: any) => param.name === "上牌时间"
    )

    if (!registrationParam?.value) {
      return null
    }

    const registrationDate = registrationParam.value

    // Парсим год и месяц
    const [year, month] = registrationDate.split("-")

    if (!year || !month) {
      return null
    }

    const regYear = parseInt(year)
    const regMonth = parseInt(month)

    // Логика определения даты производства:
    // Если регистрация в начале года (январь-март),
    // автомобиль скорее всего произведен в прошлом году
    let productionYear = regYear
    let productionMonth = regMonth

    if (regMonth <= 3) {
      productionYear = regYear - 1
      productionMonth = regMonth + 9 // Примерно за 3-6 месяцев до регистрации
    } else {
      productionMonth = regMonth - 3 // За 3 месяца до регистрации
    }

    // Корректируем месяц если он меньше 1
    if (productionMonth <= 0) {
      productionMonth += 12
      productionYear -= 1
    }

    // Форматируем в YYYY-MM-DD (ставим 01 число месяца)
    const formattedMonth = productionMonth.toString().padStart(2, "0")

    return `${productionYear}-${formattedMonth}-01`
  } catch (error) {
    console.error("Error extracting production date:", error)
    return null
  }
}

/**
 * Извлекает объем двигателя из названия и параметров
 */
export function extractEngineCapacity(
  carName: string,
  carOtherParams?: any
): number | null {
  // Ищем паттерны типа "2.0T", "1.5L", "3.0"
  const patterns = [
    /(\d+\.?\d*)[TL]/i, // 2.0T, 1.5L
    /(\d+\.?\d*)\s*л/i, // 2.0 л
    /(\d+\.?\d*)\s*[лL]/i, // варианты
  ]

  // Сначала ищем в названии
  for (const pattern of patterns) {
    const match = carName.match(pattern)
    if (match) {
      const capacity = parseFloat(match[1])
      return Math.round(capacity * 1000 - 10) // Конвертируем в мл
    }
  }

  // Затем ищем в параметрах
  if (carOtherParams) {
    for (const param of carOtherParams) {
      if (param.name.includes("发动机") && typeof param.value === "string") {
        for (const pattern of patterns) {
          const match = param.value.match(pattern)
          if (match) {
            const capacity = parseFloat(match[1])
            return Math.round(capacity * 1000 - 10)
          }
        }
      }
    }
  }

  return null
}

/**
 * Извлекает мощность из названия автомобиля
 */
export function extractHorsepower(carOtherParams?: any) {
  if (!carOtherParams || !Array.isArray(carOtherParams)) {
    return null
  }

  for (const param of carOtherParams) {
    if (param?.name?.includes("最大功率") && typeof param.value === "string") {
      // Регулярное выражение для извлечения числа и единиц
      const match = param.value.match(/(\d+(?:\.\d+)?)\s*(kW|л\.с\.|hp|PS)/i)

      if (match) {
        const numericValue = parseFloat(match[1])
        const unit = match[2].toLowerCase()

        switch (unit) {
          case "kw":
            return Math.round(numericValue * 1.35962)
          case "л.с.":
          case "hp":
          case "ps":
            return Math.round(numericValue)
          default:
            return null
        }
      }
    }
  }

  return null
}
