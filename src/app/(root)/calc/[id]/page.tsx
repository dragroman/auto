import { NodeCalculationFull } from "@entities/node-calculation"
import { TNodeCalculationFull } from "@entities/node-calculation/model/types"
import { Button } from "@shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { ArrowLeft } from "lucide-react"
import { getResource } from "next-drupal"
import Link from "next/link"

export default async function CalcFullPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const node = await getResource<TNodeCalculationFull>(
    "node--calculation",
    id,
    {
      params: { withAuth: false },
    }
  )

  return (
    <div>
      <Button variant="ghost" asChild size="sm" className="mb-2">
        <Link href="/calc">
          <ArrowLeft /> Вернуться
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Расчет автомобиля #{node.drupal_internal__nid}</CardTitle>
        </CardHeader>
        <CardContent>
          <NodeCalculationFull results={node} />
        </CardContent>
      </Card>
    </div>
  )
}
