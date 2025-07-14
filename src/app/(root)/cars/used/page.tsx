import { NodeCarTeaserType } from "@entities/node-car"
import { drupal } from "@shared/lib/drupal"
import { ViewsCar } from "@widgets/views-car"
import { getBaseCarParams } from "../api/params"
import { getTranslations } from "next-intl/server"

export default async function NewCarsPage() {
  const params = getBaseCarParams().addFilter("field_new", "0")
  const nodes = await drupal.getResourceCollection<NodeCarTeaserType[]>(
    "commerce_product--car",
    {
      params: params.getQueryObject(),
    }
  )

  const t = await getTranslations("pageUsed")

  return (
    <>
      <h1>{t("title")}</h1>
      <ViewsCar nodes={nodes} />
    </>
  )
}
