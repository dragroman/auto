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
import { formatNumber } from "@shared/lib/utils"

// Translation keys object (should be imported from your i18n setup)

export const NodeCalculationFull = ({
  results,
}: {
  results: TNodeCalculationFull
}) => {
  const t = useTranslations("formResults")
  return (
    <div className="space-y-6 px-4">
      <div>
        <div className="text-4xl font-bold mb-2">
          {formatNumber(results.field_total_price_round)} ₽
        </div>
      </div>
      <div className="max-h-[300px] overflow-y-auto overflow-x-hidden -mx-4">
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
        <Card>
          <CardHeader>
            <CardTitle>{t("additionalInfo.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("taxRefund.title")}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>{t("refundAmount.title")}</div>
                  <div className="text-right">
                    {formatNumber(results.field_tax_refund)} RMB
                  </div>
                  <div>{t("overallProfit.title")}</div>
                  <div className="text-right">
                    {formatNumber(results.field_overall_profit)} RMB
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">
                  {t("costInDifferentCurrencies.title")}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>{t("priceRmb.title")}</div>
                  <div className="text-right">
                    {formatNumber(results.price_actual_value_rmb)}
                  </div>
                  <div>{t("priceRub.title")}</div>
                  <div className="text-right">
                    {formatNumber(results.price_actual_value_rub)}
                  </div>
                  <div>{t("retailPriceEur.title")}</div>
                  <div className="text-right">
                    {formatNumber(results.price_retail_value_eur)}
                  </div>
                </div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
