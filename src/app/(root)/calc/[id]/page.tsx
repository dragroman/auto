import { NodeCalculationFull } from "@entities/node-calculation"
import { TNodeCalculationFull } from "@entities/node-calculation/model/types"
import { Button } from "@shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { ArrowLeft } from "lucide-react"
import { getResource } from "next-drupal"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Metadata } from "next"
import { drupal } from "@shared/lib/drupal"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const node = await drupal.getResourceByPath<TNodeCalculationFull>(
      `/node/${id}`
    )

    return {
      title: `${node.title} | Расчет стоимости автомобиля`,
      description: `Расчет стоимости автомобиля ${node.title}. Покупка и доставка автомобилей из Китая напрямую.`,
      // Дополнительные метаданные (опционально)
      openGraph: {
        title: `${node.title} | Расчет стоимости`,
        description: `Расчет стоимости автомобиля ${node.title}`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `${node.title} | Расчет стоимости`,
        description: `Расчет стоимости автомобиля ${node.title}`,
      },
    }
  } catch (error) {
    // Fallback метаданные если не удалось загрузить данные
    return {
      title: "Расчет стоимости автомобиля",
      description: "Покупка и доставка автомобилей из Китая напрямую",
    }
  }
}

export default async function CalcFullPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let node: TNodeCalculationFull

  try {
    node = await drupal.getResourceByPath<TNodeCalculationFull>(`/node/${id}`)
  } catch (error) {
    notFound()
  }

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
