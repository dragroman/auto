import { DrupalMedia, DrupalNode } from "next-drupal"

export interface NodeCarTeaserType extends DrupalNode {
  body?: string
  uid: string | number
  field_images?: DrupalMedia[]
  field_car_info?: {
    field_images?: DrupalMedia[]
  }
  variations: {
    price: {
      number: number
      currency_code: string
    }
  }[]
}
