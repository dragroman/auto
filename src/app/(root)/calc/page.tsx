import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { authOptions } from "@features/auth/session"
import { PriceCalc } from "@features/price-calc"
import { drupal } from "@shared/lib/drupal"
import { PageTitle } from "@shared/ui/page-title"
import { ViewsCalculation } from "@widgets/views-calculation"
import { getServerSession } from "next-auth"

export default async function CalcPage() {
  const session = await getServerSession(authOptions)
  const nodes = await drupal.getResourceCollection<TNodeCalculationTeaser[]>(
    "node--calculation",
    {
      params: { sort: "-created" },
      next: { revalidate: 3600, tags: ["calculations"] },
    }
  )

  return (
    <>
      <PageTitle title="Калькулятор стоимости автомобиля" />
      <PriceCalc />
      <ViewsCalculation nodes={nodes} currentUserID={session?.user.id} />
    </>
  )
}
