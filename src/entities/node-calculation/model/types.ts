import { DrupalNode } from "next-drupal"

export interface TNodeCalculationTeaser extends DrupalNode {
  body?: string
  uid: {
    id: string
  }
  field_total_price_round: number
  field_car_type: string
  field_new: string
  field_production_date: string
  field_capacity_ml: number
  field_horsepower: number
  field_price_actual: number
  field_cny_rub: number
  field_status: string
  field_model?: string
}

export interface TNodeCalculationFull extends DrupalNode {
  uid: {
    id: string
  }
  body?: string
  field_car_type: string
  field_new: string
  field_production_date: string
  field_capacity_ml: number
  field_horsepower: number
  field_price_actual: number
  field_price_retail: number
  field_inspection: number
  field_insurance: number
  field_employee_travel_cost: number
  field_broker_fee: number
  field_profit: number
  field_customs_fee: number
  field_vat: number
  field_cny_rub: number
  field_eur_rub: number
  field_tax_china: number
  field_tax_russia: number
  field_total_vehicle_cost: number
  field_excise_tax: number
  field_calculation_date: number
  field_total_price_round: number
  field_total_price: number
  field_customs_clear_rmb: number
  field_status: string
}
