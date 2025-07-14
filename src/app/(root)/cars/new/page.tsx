import { NodeCarTeaserType } from "@entities/node-car"
import { drupal } from "@shared/lib/drupal"
import { ViewsCar } from "@widgets/views-car"
import { getBaseCarParams } from "../api/params"
import { getTranslations } from "next-intl/server"

export default async function NewCarsPage() {
  try {
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
  } catch (error) {
    console.error("Ошибка загрузки данных:", error)
    // Возвращаем заглушку вместо падения сборки
    return (
      <div>
        <h1>Новые автомобили</h1>
        <p>Данные временно недоступны</p>
      </div>
    )
  }
}
