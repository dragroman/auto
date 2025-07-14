import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { TNodeCarFull } from "../model/types"
import { useTranslations } from "next-intl"
import { Separator } from "@shared/ui/separator"
import { formatNumber } from "@shared/lib/utils"
import { NodeCarQuickFaq } from "./NodeCarQuickFaq"

export const NodeCarDescription = ({
  title,
  isSold,
  isInStock,
  isNew,
  mileage,
}: {
  title: string
  isSold: boolean
  isInStock: boolean
  isNew: boolean
  mileage: number
}) => {
  const t = useTranslations()
  return (
    <Card className="-mt-24">
      <CardHeader>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>
          <div className="flex gap-2">
            {isSold ? (
              <Badge variant="destructive">{t("nodeCarFull.price.sold")}</Badge>
            ) : null}
            {isInStock ? (
              <Badge variant="green">{t("nodeCarFull.price.onSale")}</Badge>
            ) : null}
            {isNew ? <Badge variant="new">Без пробега</Badge> : null}
            {mileage ? (
              <Badge variant="outline">{formatNumber(mileage)} км</Badge>
            ) : null}
          </div>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <NodeCarQuickFaq />
      </CardContent>
    </Card>
  )
}
