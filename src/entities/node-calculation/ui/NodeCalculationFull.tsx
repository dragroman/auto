import React from "react"
import { useTranslations } from "next-intl"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table"
import { Separator } from "@shared/ui/separator"
import { TNodeCalculationFull } from "../model/types"
import { ResultsTableRow } from "./ResultsTableRow"
import { cn, formatNumber } from "@shared/lib/utils"

// Translation keys object (should be imported from your i18n setup)

export const NodeCalculationFull = ({
  results,
  scroll = false,
}: {
  results: TNodeCalculationFull
  scroll?: boolean
}) => {
  const t = useTranslations("formResults")
  return (
    <div className="space-y-6">
      <div className={cn(`text-4xl font-bold mb-2`, scroll && "px-4")}>
        {formatNumber(results.field_total_price_round)} ₽
      </div>
      <div
        className={`${scroll ? "max-h-[300px] overflow-y-auto overflow-x-hidden" : "-mx-4"}`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">{t("expenseItem.title")}</TableHead>
              <TableHead className="text-right">{t("amount.title")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ResultsTableRow
              title={t("carCost.title")}
              results={results.field_price_actual * results.field_cny_rub}
              currency="₽"
            />
            <ResultsTableRow
              title={t("taxRussia.title")}
              results={results.field_tax_russia}
              currency="₽"
            />
            <ResultsTableRow
              title={t("taxChina.title")}
              results={results.field_tax_china}
              tooltip={t("taxChina.tooltip")}
              currency="₽"
            />

            <ResultsTableRow
              title={t("customsDeclaration.title")}
              results={results.field_declaration_rmb * results.field_cny_rub}
              currency="₽"
            />

            <ResultsTableRow
              title={t("customsClearance.title")}
              results={results.field_clearance_rub}
              currency="₽"
            />

            <ResultsTableRow
              title={t("domesticShippingChina.title")}
              tooltip={t("domesticShippingChina.tooltip")}
              results={results.field_domestic_shipping * results.field_cny_rub}
              currency="₽"
            />
            <ResultsTableRow
              title={t("insurance.title")}
              results={results.field_insurance * results.field_cny_rub}
              currency="₽"
            />
            <ResultsTableRow
              title={t("employeeTravelCost.title")}
              results={
                results.field_employee_travel_cost * results.field_cny_rub
              }
              currency="₽"
            />
            <ResultsTableRow
              title={t("brokerFee.title")}
              results={results.field_broker_fee * results.field_tax_russia}
              currency="₽"
            />
            <ResultsTableRow
              title={t("inspection.title")}
              results={results.field_inspection * results.field_cny_rub}
              currency="₽"
            />
            <ResultsTableRow
              title={t("commission.title")}
              results={results.field_profit * results.field_cny_rub}
              currency="₽"
            />
          </TableBody>
        </Table>
        <Separator className="my-4" />
        <div className="px-4">
          <div className="font-medium mb-4">{t("additionalInfo.title")}</div>
          <div>
            <h3 className="text-sm font-medium mb-2">
              {t("exchangeRates.title")}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>{t("cnyRub.title")}</div>
              <div className="text-right">{results.field_cny_rub}</div>
              <div>{t("eurRub.title")}</div>
              <div className="text-right">{results.field_eur_rub}</div>
            </div>
          </div>
          <Separator className="my-4" />
          <h3 className="text-sm font-medium mb-2">
            {t("costInDifferentCurrencies.title")}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>{t("priceRmb.title")}</div>
            <div className="text-right">
              {formatNumber(results.field_total_price / results.field_cny_rub)}{" "}
              RMB
            </div>
            <div>{t("priceRub.title")}</div>
            <div className="text-right">
              {formatNumber(results.field_total_price)} RUB
            </div>
            <div>{t("retailPriceEur.title")}</div>
            <div className="text-right">
              {formatNumber(results.field_total_price / results.field_eur_rub)}{" "}
              EUR
            </div>

            {results.vehicle_age !== undefined && (
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("vehicleInfo.title")}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>{t("vehicleAge.title")}</div>
                  <div className="text-right">{results.vehicle_age}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
