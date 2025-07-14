import { formatNumber } from "@shared/lib/utils"
import { Badge } from "@shared/ui/badge"
import { Button } from "@shared/ui/button"
import { Calculator } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
export const NodeCarPrice = ({
  price,
  field_price_actual,
  calcId,
}: {
  price: string
  field_price_actual: number
  calcId: number
}) => {
  const t = useTranslations("nodeCarFull")
  return (
    <>
      <div className="flex flex-row items-center rounded-t-xl bg-linear-to-b from-amber-200 from-30% to-transparent/0 pb-28 px-4 pt-4">
        <div className="flex justify-between items-center w-full">
          <div>
            <div className="text-xl md:text-4xl font-bold text-red-500">
              {price}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {t("price.chinaPrice")}: {formatNumber(field_price_actual)}{" "}
              {"RMB"}
            </div>
          </div>
          <div>
            <Button asChild variant="white" size="sm">
              <Link href={`/calc/${calcId}`}>
                <Calculator />
                Расчет
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
