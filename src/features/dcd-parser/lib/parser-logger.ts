// src/features/dcd-parser/lib/parser-logger.ts
import { DCDCarData } from "../model/types"

/**
 * Логирование результатов парсинга
 */
export function logParsingResult(
  success: boolean,
  carData?: DCDCarData,
  error?: string
) {
  const timestamp = new Date().toISOString()

  if (success && carData) {
    console.log(`[${timestamp}] PARSER SUCCESS:`, {
      sku_id: carData.sku_id,
      brand: carData.brand_name,
      series: carData.series_name,
      year: carData.year,
      price: carData.price,
    })
  } else {
    console.error(`[${timestamp}] PARSER ERROR:`, error)
  }
}

/**
 * Логирование этапов парсинга
 */
export function logParsingStep(step: string, data?: any) {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] PARSER STEP: ${step}`, data || "")
}

/**
 * Логирование предупреждений
 */
export function logParsingWarning(message: string, data?: any) {
  const timestamp = new Date().toISOString()
  console.warn(`[${timestamp}] PARSER WARNING: ${message}`, data || "")
}
