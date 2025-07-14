import { NavigationMenuViewportProps } from "@radix-ui/react-navigation-menu"
import { DrupalMedia, DrupalNode } from "next-drupal"

export interface NodeCarTeaserType extends DrupalNode {
  body?: string
  uid: string | number
  field_images?: DrupalMedia[]
  field_car_info: {
    field_images?: DrupalMedia[]
    field_brand: {
      name: string
    }
  }

  field_mileage: number
  variations: {
    price: {
      number: number
      currency_code: string
    }
    field_price_actual: number
  }[]
}
export interface TNodeCarFull extends NodeCarTeaserType {
  field_car_info: {
    field_brand: {
      name: string
    }
    field_model: string
    field_year: number
    field_drive_mode: string
    field_configuration_en: string
    field_transmission?: string
    field_horsepower?: string
    field_car_type?: string
    field_capacity: string
    field_battery_capacity?: string
  }
  field_sold: boolean
  field_in_stock: boolean
  field_new: boolean
  field_mileage: number
  field_model: string
  field_calculation: {
    id: string
    resourceIdObjMeta: {
      drupal_internal__target_id: number
    }
  }
}
