import React from "react"
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
import { PriceCalculationResults } from "../model/types"

// Форматирование чисел с разделителями
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.round(num))
}

interface PriceCalculatorResultsProps {
  results: PriceCalculationResults
}

export const PriceCalculatorResults: React.FC<PriceCalculatorResultsProps> = ({
  results,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Итоговая стоимость</CardTitle>
          <CardDescription>
            Рассчитанная цена автомобиля с учетом всех расходов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">
            {formatNumber(results.rounded_price_final)} ₽
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Наименование</TableHead>
                <TableHead className="text-right">Значение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Стоимость для партнера</TableCell>
                <TableCell className="text-right">
                  {formatNumber(results.price_partner)} ₽
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Стоимость без модификаций</TableCell>
                <TableCell className="text-right">
                  {formatNumber(results.price_final_without_mods)} ₽
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Детализация стоимости</CardTitle>
          <CardDescription>
            Разбивка по составляющим итоговой цены
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Статья расходов</TableHead>
                <TableHead className="text-right">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Стоимость автомобиля</TableCell>
                <TableCell className="text-right">
                  {formatNumber(results.price_actual_value_rub)} ₽
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Комиссия</TableCell>
                <TableCell className="text-right">
                  {formatNumber(results.profit_value_rub)} ₽
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Налог в Китае</TableCell>
                <TableCell className="text-right">
                  {formatNumber(results.tax_china)} ₽
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Налог в России</TableCell>
                <TableCell className="text-right">
                  {formatNumber(results.tax_russia)} ₽
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Доставка</TableCell>
                <TableCell className="text-right">
                  {formatNumber(
                    results.domestic_shipping_rmb * results.cny_rub
                  )}{" "}
                  ₽
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Дополнительные расходы</TableCell>
                <TableCell className="text-right">
                  {formatNumber(
                    results.additional_expenses_rmb * results.cny_rub
                  )}{" "}
                  ₽
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Дополнительная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Курсы валют</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>CNY/RUB:</div>
                <div className="text-right">{results.cny_rub.toFixed(2)}</div>
                <div>EUR/RUB:</div>
                <div className="text-right">{results.eur_rub.toFixed(2)}</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Налоговый возврат</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Сумма возврата:</div>
                <div className="text-right">
                  {formatNumber(results.tax_refund)} RMB
                </div>
                <div>Общая прибыль:</div>
                <div className="text-right">
                  {formatNumber(results.overall_profit)} RMB
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">
                Стоимость в разных валютах
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Цена (RMB):</div>
                <div className="text-right">
                  {formatNumber(results.price_actual_value_rmb)}
                </div>
                <div>Цена (RUB):</div>
                <div className="text-right">
                  {formatNumber(results.price_actual_value_rub)}
                </div>
                <div>Розничная цена (EUR):</div>
                <div className="text-right">
                  {formatNumber(results.price_retail_value_eur)}
                </div>
              </div>
            </div>

            {results.vehicle_age !== undefined && (
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Информация о транспортном средстве
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Возраст (лет):</div>
                  <div className="text-right">{results.vehicle_age}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
