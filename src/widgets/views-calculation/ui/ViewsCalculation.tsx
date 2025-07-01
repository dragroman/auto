import {
  NodeCalculationTeaser,
  type TNodeCalculationTeaser,
} from "@entities/node-calculation"
import { RequestCalc } from "@features/request-calc"
import { Button } from "@shared/ui/button"
import Link from "next/link"

export const ViewsCalculation = async ({
  nodes,
  currentUserID,
}: {
  nodes: TNodeCalculationTeaser[]
  currentUserID?: string
}) => {
  return (
    <div className="grid gap-2">
      {!nodes || nodes.length === 0 ? (
        <div className="border p-4 rounded-2xl text-center bg-gray-100">
          <div className="mb-4">{"Вы не добавили ещё расчётов"}</div>
          <div>
            <Button asChild variant="outline">
              <Link href="/calc">Посчитать</Link>
            </Button>
          </div>
        </div>
      ) : (
        nodes.map((node) => (
          <NodeCalculationTeaser
            key={node.id}
            node={node}
            currentUserID={currentUserID}
            owner={node.uid.id}
            actions={<RequestCalc currentUserID={currentUserID} node={node} />}
          />
        ))
      )}
    </div>
  )
}
