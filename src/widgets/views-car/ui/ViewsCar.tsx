import { NodeCarTeaser } from "@entities/node-car"
import type { NodeCarTeaserType } from "@entities/node-car"

export const ViewsCar = async ({ nodes }: { nodes: NodeCarTeaserType[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {nodes.map((node) => (
        <NodeCarTeaser key={node.id} node={node} />
      ))}
    </div>
  )
}
