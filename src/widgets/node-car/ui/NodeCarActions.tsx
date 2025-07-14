import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui/drawer"
import { WebformCallbackForm } from "@features/webform-callback"
import { Button } from "@shared/ui/button"
import Link from "next/link"
import { PhoneCall } from "lucide-react"

export const NodeCarActions = ({
  nodeId,
  calcId,
}: {
  nodeId: string
  calcId: number
}) => {
  return (
    <div className="w-full bg-white border-t border-gray-200">
      <div className="px-4 py-3 flex gap-3">
        <Button size="lg" asChild variant="secondary" className="w-2/5">
          <Link href={`/calc/${calcId}`}>Расчет</Link>
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="lg" className="w-3/5">
              <PhoneCall />
              Запросить
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Обратный звонок</DrawerTitle>

              <WebformCallbackForm nodeId={nodeId} />
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        {/* Кнопка-ссылка */}
      </div>
    </div>
  )
}
