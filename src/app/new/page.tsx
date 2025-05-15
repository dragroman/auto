import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { DrupalNode } from "next-drupal"

export default async function NewCarsPage() {
  const apiParams = new DrupalJsonApiParams()
  const request = await drupal.getResourceCollection<DrupalNode[]>(
    "node--car",
    {
      params: apiParams.getQueryObject(),
    }
  )
  return <h1>New Page</h1>
}
