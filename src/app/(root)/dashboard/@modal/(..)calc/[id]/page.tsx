import { NodeCalculationModal } from "@entities/node-calculation"

export default async function DashboardModal({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <NodeCalculationModal id={id} />
}
