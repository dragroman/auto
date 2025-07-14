// src/features/dcd-parser/lib/data-validators.ts
import { DCDCarData } from "../model/types"
import { extractSkuId } from "./data-extractors"

/**
 * Проверяет валидность URL DCD
 */
export function isValidDcdUrl(url: string): boolean {
  return url.includes("dcdapp.com") && !!extractSkuId(url)
}

/**
 * Определяет, новый ли автомобиль по году
 */
export function isNewCar(year: string): boolean {
  const currentYear = new Date().getFullYear()
  const carYear = parseInt(year)
  return carYear >= currentYear - 1 // Считаем новым, если не старше года
}

/**
 * Валидация данных автомобиля перед отправкой в Drupal
 */
export function validateCarData(carData: DCDCarData): string[] {
  const errors: string[] = []

  if (!carData.sku_id) {
    errors.push("Отсутствует sku_id")
  }

  if (!carData.car_name) {
    errors.push("Отсутствует название автомобиля")
  }

  if (!carData.brand_name) {
    errors.push("Отсутствует марка автомобиля")
  }

  if (!carData.series_name) {
    errors.push("Отсутствует модель автомобиля")
  }

  if (!carData.year || isNaN(parseInt(carData.year))) {
    errors.push("Некорректный год выпуска")
  }

  if (!carData.price) {
    errors.push("Некорректная цена")
  }

  return errors
}
