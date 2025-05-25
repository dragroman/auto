import { NodeCarTeaserType } from "@entities/node-car"
import { drupal } from "@shared/lib/drupal"
import { ViewsCar } from "@widgets/views-car"
import { getBaseCarParams } from "../api/params"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export default async function NewCarsPage() {
  const params = getBaseCarParams().addFilter("field_new", "1")
  const nodes = await drupal.getResourceCollection<NodeCarTeaserType[]>(
    "commerce_product--car",
    {
      params: params.getQueryObject(),
    }
  )

  const t = await getTranslations("pageNew")

  return (
    <>
      <h1>{t("title")}</h1>
      <ViewsCar nodes={nodes} />
    </>
  )
}
