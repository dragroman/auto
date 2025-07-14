import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "BrandPage",
  description: "",
}

async function fetchAllBrands() {
  const pageSize = 50
  const allBrands = []
  let page = 0
  let fetchedCount = 0

  while (true) {
    const params = new DrupalJsonApiParams()
      .addFields("taxonomy_term--brand", [
        "name",
        "drupal_internal__tid",
        "field_name_chinese",
      ])
      .addFilter("field_name_chinese", "红旗")
      .addPageLimit(pageSize)
      .addPageOffset(page * pageSize)

    const batch = await drupal.getResourceCollection("taxonomy_term--brand", {
      params: params.getQueryObject(),
    })

    allBrands.push(...batch)
    fetchedCount += batch.length

    if (batch.length < pageSize) break

    page++
  }

  return allBrands
}

export default async function BrandPage() {
  const brands = await fetchAllBrands()

  return (
    <>
      <PageTitle title="Марки" />
      <ul>
        {brands.map((item) => (
          <li key={item.id}>
            <div className="flex flex-row justify-between">
              <div>{item.name}</div>
              <div>{item.id}</div>
              <div>{item.drupal_internal__tid}</div>
              <div>{item.field_name_chinese}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
