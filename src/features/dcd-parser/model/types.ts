// src/features/dcd-parser/model/types.ts
export interface DCDCarData {
  sku_id: string
  sku_version: string
  spu_id: string
  car_name: string
  series_name: string
  brand_name: string
  year: string
  mileage: number
  fuel_form: number
  shop_name: string
  car_source_city_name: string
  price: number
  official_price?: string
  production_date: string
  head_images: Array<{
    pic_url: string
    tag_name: string
    point_name: string
    point_key: string
  }>
  engine_capacity: number
  horsepower: number | null
}

export interface DCDApiResponse {
  status: number
  message: string
  data: {
    common_info: DCDCarData
    components: Array<{
      type: number
      vo: {
        display: any
      }
    }>
  }
}

export interface ParseResult {
  success: boolean
  calculation?: {
    id: string
    title: string
  }
  product_id?: string
  message?: string
  error?: string
}

export interface ParserRequest {
  url: string
}

export interface CreatedCalculation {
  id: string
  title: string
  field_total_price_round: number
  field_car_type: string
  field_model: string
  created: string
}

export interface CreatedCarProduct {
  id: string
  title: string
  body: string
  field_mileage: number
  field_production_date: string
  variations: Array<{
    id: string
    price: number
    currency: string
  }>
  created: string
}
