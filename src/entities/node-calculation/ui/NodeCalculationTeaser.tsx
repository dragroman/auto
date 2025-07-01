import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import { TNodeCalculationTeaser } from "../model/types"
import { buttonVariants } from "@shared/ui/button"
import { Calendar, ChartCandlestick, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { formatNumber, isOwner } from "@shared/lib/utils"
import { Badge } from "@shared/ui/badge"
import { useTranslations } from "next-intl"
import { createTranslationMapper } from "../utils/translations"
import { ReactNode } from "react"

export const NodeCalculationTeaser = ({
  node,
  currentUserID,
  owner,
  actions,
}: {
  node: TNodeCalculationTeaser
  currentUserID?: string
  owner: string
  actions?: ReactNode
}) => {
  const t = useTranslations()
  const mapper = createTranslationMapper(t)

  return (
    <Card className="gap-2 bg-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex gap-2">
            <Badge variant="default">
              {formatNumber(node.field_price_actual)} {"RMB"}
            </Badge>
            <Badge variant="outline">
              {currentUserID && isOwner(owner, currentUserID)
                ? node.field_model || "Неизвестно"
                : t("nodeCalculation.anonymous")}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span className="text-sm text-muted-foreground">
              <span>{node.title.split(" ")[0]}</span>{" "}
              <span className="hidden md:inline">
                {node.title.split(" ").slice(1).join(" ")}
              </span>
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 mb-4">
        <div className="flex items-baseline gap-4">
          <div className="text-2xl font-bold text-black">
            {formatNumber(node.field_total_price_round)} ₽
          </div>
          <div className="text-muted-foreground text-sm">
            <ChartCandlestick className="inline-block w-4 h-4 mr-2" />
            {node.field_cny_rub} ₽
          </div>
        </div>
        <div className="space-x-2 space-y-2">
          <Badge variant="outline">
            {mapper.engineType(node.field_car_type)}
          </Badge>
          <Badge variant="outline">
            {node.field_new
              ? mapper.isNew(node.field_new)
              : node.field_vehicle_age &&
                mapper.vehicleAge(node.field_vehicle_age)}
          </Badge>
          {node.field_capacity_ml && (
            <Badge variant="outline">
              {node.field_capacity_ml} {"ml"}
            </Badge>
          )}
          {node.field_horsepower && (
            <Badge variant="outline">
              {node.field_horsepower} {"hp"}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <div>{actions}</div>
          <div>
            <Link
              href={`/calc/${node.id}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {t("form.more")}
              <ChevronRightIcon />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
