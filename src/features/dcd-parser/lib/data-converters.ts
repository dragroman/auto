// src/features/dcd-parser/lib/data-converters.ts

/**
 * Конвертирует пробег из тысяч км в метры
 */
export function convertMileageToMeters(mileageThousands: number): number {
  return Math.round(mileageThousands * 10000) // тыс.км -> метры
}

/**
 * Конвертирует тип топлива из числа в строку
 */
export function convertFuelForm(carFuelForm: number): string {
  switch (carFuelForm) {
    case 1:
      return "gas"
    case 2:
      return "diesel"
    case 3:
    case 5:
    case 6:
    case 13:
      return "hybrid"
    case 4:
      return "electric"
    default:
      throw new Error(`Unknown fuel form type: ${carFuelForm}`)
  }
}

/**
 * Генерирует slug для URL из названия
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Удаляем спецсимволы
    .replace(/\s+/g, "-") // Пробелы в дефисы
    .replace(/-+/g, "-") // Множественные дефисы в один
    .trim()
}
