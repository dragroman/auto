import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { authOptions } from "@features/auth/session"
import { PriceCalc } from "@features/price-calc"
import { drupal } from "@shared/lib/drupal"
import { ViewsCalculation } from "@widgets/views-calculation"
import { getServerSession } from "next-auth"

export default async function CalcPage() {
  const session = await getServerSession(authOptions)
  const nodes = await drupal.getResourceCollection<TNodeCalculationTeaser[]>(
    "node--calculation",
    {
      params: { sort: "-created" },
      withAuth: true,
      next: { revalidate: 3600, tags: ["calculations"] },
    }
  )

  return (
    <>
      <PriceCalc />
      <ViewsCalculation nodes={nodes} currentUserID={session?.user.id} />
    </>
  )
}
