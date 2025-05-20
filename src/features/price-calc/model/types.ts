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

export interface PriceCalculationResults {
  cny_rub: number
  eur_rub: number
  price_final: number
  rounded_price_final: number
  tax_china: number
  tax_russia: number
  total_vehicle_cost: number
  price_partner: number
  price_actual_value_rmb: number
  price_actual_value_rub: number
  price_retail_value_rmb: number
  price_retail_value_rub: number
  price_retail_value_eur: number
  profit_value_rmb: number
  profit_value_rub: number
  tax_refund: number
  overall_profit: number
  vehicle_age?: number
  price_final_without_mods: number
  domestic_shipping_rmb: number
  additional_expenses_rmb: number
}
