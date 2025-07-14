import { getCarData } from "@entities/node-car"
import { NodeCar } from "@widgets/node-car"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const node = await getCarData(id)
  if (!node) {
    return { title: "Страница не найдена" }
  }
  return { title: node.title }
}
export default async function CarFullPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const node = await getCarData(id)

  if (!node) {
    notFound()
  }

  return <NodeCar node={node} />
}
