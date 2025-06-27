import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { ViewsCar } from "@widgets/views-car"
import { getTranslations } from "next-intl/server"
import { getBaseCarParams } from "./api/params"
import { NodeCarTeaserType } from "@entities/node-car"

export default async function CarsPage() {
  const t = await getTranslations("pageCars")
  try {
    const params = getBaseCarParams()
    const nodes = await drupal.getResourceCollection<NodeCarTeaserType[]>(
      "commerce_product--car",
      {
        params: params.getQueryObject(),
      }
    )

    return (
      <>
        <PageTitle title={t("title")} />
        <ViewsCar nodes={nodes} />
      </>
    )
  } catch (error) {
    console.error("Ошибка загрузки данных:", error)
    // Возвращаем заглушку вместо падения сборки
    return (
      <div>
        <PageTitle title={t("title")} />
        <p>Данные временно недоступны</p>
      </div>
    )
  }
}
