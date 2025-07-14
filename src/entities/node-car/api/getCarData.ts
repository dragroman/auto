import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { TNodeCarFull } from "../model/types"

export async function getCarData(id: string) {
  try {
    const params = new DrupalJsonApiParams()
      .addFilter("status", "1")
      .addInclude([
        "field_car_info.field_brand",
        "field_images.field_media_image",
        "field_car_info.field_images.field_media_image",
        "field_calculation",
        "variations",
      ])
      .addFields("commerce_product--car", [
        "title",
        "path",
        "body",
        "uid",
        "created",
        "variations",
        "field_car_info",
        "field_images",
        "field_mileage",
        "field_production_date",
        "field_sold",
        "field_in_stock",
        "field_new",
        "field_calculation",
      ])
      .addFields("node--car", [
        "field_images",
        "field_brand",
        "field_model",
        "field_year",
        "field_drive_mode",
        "field_configuration_en",
        "field_transmission",
        "field_horsepower",
        "field_car_type",
        "field_capacity",
        "field_battery_capacity",
      ])
      .addFields("node--car", [
        "field_images",
        "field_brand",
        "field_model",
        "field_year",
        "field_drive_mode",
        "field_configuration_en",
        "field_transmission",
        "field_horsepower",
        "field_car_type",
        "field_capacity",
        "field_battery_capacity",
      ])
      .addFields("node--calculation", ["field_total_price_round"])
      .addFields("taxonomy_term--brand", ["name", "drupal_internal__tid", "id"])
      .addFields("commerce_product_variation--car", [
        "price",
        "field_price_actual",
      ])
      .addFields("media--car_image", ["field_media_image", "name"])

    const res = await drupal.getResourceByPath<TNodeCarFull>(`/product/${id}`, {
      params: params.getQueryObject(),
    })
    return res
  } catch (error: any) {
    if (error?.statusCode === "404" || error?.statusCode === 404) {
      return null
    }
    throw error
  }
}
