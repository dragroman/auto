import { TNodeCalculationFull } from "@entities/node-calculation/model/types"
import { getResource } from "next-drupal"

export default async function CalcFullPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const node = await getResource<TNodeCalculationFull>(
    "node--car",
    "991d12d8-68ec-46bd-b34d-faca53353352"
  )

  return <div>Node {node.id}</div>
}
