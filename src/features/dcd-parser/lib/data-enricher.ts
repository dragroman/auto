// src/features/dcd-parser/lib/data-enricher.ts
import { DCDCarData } from "../model/types"
import {
  extractDataFromComponents,
  extractProductionDate,
  extractEngineCapacity,
  extractHorsepower,
} from "./data-extractors"

/**
 * Обогащает базовые данные автомобиля дополнительной информацией из компонентов
 */
export function enrichCarData(
  carData: DCDCarData,
  components: any[]
): DCDCarData {
  const extractedData = extractDataFromComponents(components)
  const enrichedData = { ...carData }

  // Обновляем цену, если найдена в компонентах
  if (extractedData.price) {
    enrichedData.price = extractedData.price * 10000
  }

  // Извлекаем и устанавливаем дату производства
  if (extractedData.important_param) {
    const productionDate = extractProductionDate(
      extractedData.important_param.param_infos
    )
    if (productionDate) {
      enrichedData.production_date = productionDate
    }
  }

  // Извлекаем объем двигателя
  if (extractedData.other_param) {
    const engineCapacity = extractEngineCapacity(
      carData.car_name,
      extractedData.other_param.param_infos
    )
    const horsepower = extractHorsepower(extractedData.other_param.param_infos)
    if (engineCapacity) {
      enrichedData.engine_capacity = engineCapacity
      enrichedData.horsepower = horsepower
    }
  }

  // Добавляем изображения, если найдены
  if (extractedData.head_images) {
    enrichedData.head_images = extractedData.head_images
  }
  // Добавляем официальную цену
  if (extractedData.official_price) {
    enrichedData.official_price = extractedData.official_price
  }

  return enrichedData
}
