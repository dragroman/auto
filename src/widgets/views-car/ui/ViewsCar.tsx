import { NodeCarTeaser } from "@entities/node-car"
import type { NodeCarTeaserType } from "@entities/node-car"

export const ViewsCar = async ({ nodes }: { nodes: NodeCarTeaserType[] }) => {
  return (
    <div className="grid md:grid-cols-2 gap-2">
      {nodes.map((node) => (
        <NodeCarTeaser key={node.id} node={node} />
      ))}
    </div>
  )
}
