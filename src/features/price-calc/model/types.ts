export interface PriceCalculatorFormData {
  new: boolean
  production_date?: string
  engine_type: "gas" | "hybrid" | "electric"
  capacity_ml?: number
  horsepower?: number
  price_actual_rmb: number
  price_retail_rmb?: number
  profit_rmb: number
  domestic_shipping_rmb: number
  additional_expenses_rmb: number
}
