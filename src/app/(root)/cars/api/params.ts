import { DrupalJsonApiParams } from "drupal-jsonapi-params"
export const getBaseCarParams = () => {
  return new DrupalJsonApiParams()
    .addInclude([
      "field_images.field_media_image",
      "field_car_info.field_images.field_media_image",
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
      "drupal_internal__product_id",
    ])
    .addFields("node--car", ["field_images"])
    .addFields("commerce_product_variation--car", ["price"])
    .addSort("created", "DESC")
    .addPageLimit(15)
}
