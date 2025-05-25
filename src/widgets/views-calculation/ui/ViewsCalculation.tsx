import {
  NodeCalculation,
  type TNodeCalculationTeaser,
} from "@entities/node-calculation"

export const ViewsCalculation = async ({
  nodes,
}: {
  nodes: TNodeCalculationTeaser[]
}) => {
  return (
    <div className="grid gap-4">
      {nodes.map((node) => (
        <NodeCalculation key={node.id} node={node} />
      ))}
    </div>
  )
}
