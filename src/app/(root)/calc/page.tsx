import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { PriceCalc } from "@features/price-calc"
import { drupal } from "@shared/lib/drupal"
import { ViewsCalculation } from "@widgets/views-calculation"

export default async function CalcPage() {
  const nodes = await drupal.getResourceCollection<TNodeCalculationTeaser[]>(
    "node--calculation",
    {
      params: { sort: "-created" },
      next: { revalidate: 3600, tags: ["calculations"] },
    }
  )
  return (
    <>
      <PriceCalc />
      <ViewsCalculation nodes={nodes} />
    </>
  )
}
