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
import { Help_text } from "@shared/config/constans"

// Translation keys object (should be imported from your i18n setup)

export const NodeCalculationFull = ({
  results,
  scroll = false,
}: {
  results: TNodeCalculationFull
  scroll?: boolean
}) => {
  const t = useTranslations("formResults")
  console.log(results)
  return (
    <div className="space-y-6">
      <div className={cn(`text-4xl font-bold mb-2`, scroll && "px-4")}>
        {formatNumber(results.field_total_price_round)} ₽
      </div>
      <div
        className={`${scroll ? "max-h-[400px] overflow-y-auto overflow-x-hidden" : "-mx-4"}`}
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
              tooltip={t("carCost.tooltip")}
              info={t("carCost.info")}
              currency="₽"
            />
            <ResultsTableRow
              title={t("taxRussia.title")}
              tooltip={t("taxRussia.tooltip")}
              info={t("taxRussia.info")}
              url_name={[
                t("taxRussia.url_name1"),
                t("taxRussia.url_name2"),
                t("taxRussia.url_name3"),
              ]}
              url={[
                Help_text.сustomsВutiesRussia,
                Help_text.сustomsRecyclingeRussia,
                Help_text.сustomsRecyclingeRussia1,
              ]}
              document={true}
              results={results.field_tax_russia}
              currency="₽"
            />
            <ResultsTableRow
              title={t("taxChina.title")}
              results={results.field_tax_china}
              currency="₽"
            />
            <ResultsTableRow
              title={t("customsDeclaration.title")}
              results={results.field_declaration_rmb * results.field_cny_rub}
              tooltip={t("customsDeclaration.tooltip")}
              info={t("customsDeclaration.info")}
              currency="₽"
            />
            <ResultsTableRow
              title={t("customsClearance.title")}
              tooltip={t("customsClearance.tooltip")}
              info={t("customsClearance.info")}
              results={results.field_clearance_rub}
              currency="₽"
            />
            <ResultsTableRow
              title={t("domesticShippingChina.title")}
              tooltip={t("domesticShippingChina.tooltip")}
              info={t("domesticShippingChina.info")}
              url_name={t("domesticShippingChina.url_name")}
              url={Help_text.googleMapsTransfer}
              results={results.field_domestic_shipping * results.field_cny_rub}
              currency="₽"
            />
            <ResultsTableRow
              title={t("insurance.title")}
              tooltip={t("insurance.tooltip")}
              info={t("insurance.info")}
              results={results.field_insurance * results.field_cny_rub}
              currency="₽"
            />
            <ResultsTableRow
              title={t("employeeTravelCost.title")}
              tooltip={t("employeeTravelCost.tooltip")}
              info={t("employeeTravelCost.info")}
              url_name={t("employeeTravelCost.url_name")}
              url={Help_text.googleMapsOfficeChina}
              results={
                results.field_employee_travel_cost * results.field_cny_rub
              }
              currency="₽"
            />
            <ResultsTableRow
              title={t("brokerFee.title")}
              results={results.field_broker_fee * results.field_tax_russia}
              tooltip={t("brokerFee.tooltip")}
              currency="₽"
            />
            <ResultsTableRow
              title={t("inspection.title")}
              tooltip={t("inspection.tooltip")}
              info={t("inspection.info")}
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
