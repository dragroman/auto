import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { authOptions } from "@features/auth/session"
import { PriceCalc } from "@features/price-calc"
import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { ViewsCalculation } from "@widgets/views-calculation"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Калькулятор стоимости автомобиля из Китая",
  description: "Покупка и доставка автомобилей из Китая напрямую",
}

export default async function CalcPage() {
  const session = await getServerSession(authOptions)
  const nodes = await drupal.getResourceCollection<TNodeCalculationTeaser[]>(
    "node--calculation",
    {
      params: {
        sort: "-created",
        "page[limit]": 10,
      },
      next: { revalidate: 3600, tags: ["calculations"] },
    }
  )
  const t = await getTranslations("form")
  return (
    <>
      <PageTitle title={t("title")} />
      <PriceCalc />
      <ViewsCalculation nodes={nodes} currentUserID={session?.user.id} />
    </>
  )
}
