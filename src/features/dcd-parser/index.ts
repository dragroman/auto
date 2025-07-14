export { DcdParser } from "./ui/DcdParser"
export { ParserStats } from "./ui/ParserStats"
export type {
  DCDCarData,
  DCDApiResponse,
  ParseResult,
  ParserRequest,
  CreatedCalculation,
  CreatedCarProduct,
} from "./model/types"

export {
  extractDataFromComponents,
  extractSkuId,
  extractProductionDate,
  extractEngineCapacity,
  extractHorsepower,
} from "./lib/data-extractors"

// Обогащение данных
export { enrichCarData } from "./lib/data-enricher"

// Конвертация данных
export {
  convertMileageToMeters,
  convertFuelForm,
  generateSlug,
} from "./lib/data-converters"

// Валидация
export { isValidDcdUrl, isNewCar, validateCarData } from "./lib/data-validators"

// Форматирование для Drupal
export {
  formatCarInfoData,
  formatCarProductData,
  formatCarProductVariationData,
  createCarImages,
} from "./lib/drupal-formatters"

// Логирование
export {
  logParsingResult,
  logParsingStep,
  logParsingWarning,
} from "./lib/parser-logger"
