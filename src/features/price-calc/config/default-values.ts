import { z } from "zod"
import { formSchema } from "../model/schema"

// Определяем начальные значения строго типизированными
export const defaultValues: z.infer<typeof formSchema> = {
  new: true,
  engine_type: "gas",
  profit_rmb: 5000,
  domestic_shipping_rmb: 1500, // Доставка в Китай 1500 - 5000
  additional_expenses_rmb: 0,
  price_actual_rmb: 0,
  price_retail_rmb: 0,
  capacity_ml: 0,
  horsepower: 0,
  inspection: 600, // inspection report
  insurance: 1500, // В зависимости от наличия страховки, без страховки продавать нельзя 0 - 2000
  employeeTravelCost: 1000, // Оплата стоимости проверки автомобиля 1000 - 5000
  brokerFee: 0.015, // Брокер 经纪人 russia_customs
}
