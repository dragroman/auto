import { z } from "zod"

export const formSchema = z
  .object({
    new: z.boolean().default(false),
    production_date: z
      .date()
      .optional()
      .refine(
        (val) => {
          if (val === undefined) return true
          return true // Further validation if needed
        },
        {
          message: "Введите корректную дату производства",
        }
      ),
    engine_type: z.enum(["gas", "hybrid", "electric"], {
      required_error: "Выберите тип двигателя",
    }),
    capacity_ml: z.coerce.number().min(0).optional(),
    horsepower: z.coerce.number().min(0).optional(),
    price_actual_rmb: z.coerce.number().min(1, {
      message: "Введите корректную цену",
    }),
    price_retail_rmb: z.coerce.number().min(0).optional(),
    profit_rmb: z.coerce
      .number()
      .min(0, {
        message: "Введите корректную сумму прибыли",
      })
      .default(21000),
    domestic_shipping_rmb: z.coerce
      .number()
      .min(0, {
        message: "Введите корректную сумму доставки",
      })
      .default(2000),
    additional_expenses_rmb: z.coerce
      .number()
      .min(0, {
        message: "Введите корректную сумму дополнительных расходов",
      })
      .default(10000),
  })
  .refine(
    (data) => {
      // Если не новый автомобиль, дата производства обязательна
      if (!data.new && !data.production_date) {
        return false
      }
      return true
    },
    {
      message: "Укажите дату производства для б/у автомобиля",
      path: ["production_date"],
    }
  )
  .refine(
    (data) => {
      // Если двигатель газовый или гибридный, объем обязателен
      if (
        (data.engine_type === "gas" || data.engine_type === "hybrid") &&
        !data.capacity_ml
      ) {
        return false
      }
      return true
    },
    {
      message: "Укажите объем двигателя",
      path: ["capacity_ml"],
    }
  )
  .refine(
    (data) => {
      // Если двигатель электрический или гибридный, лошадиные силы обязательны
      if (
        (data.engine_type === "electric" || data.engine_type === "hybrid") &&
        !data.horsepower
      ) {
        return false
      }
      return true
    },
    {
      message: "Укажите мощность двигателя",
      path: ["horsepower"],
    }
  )
  .refine(
    (data) => {
      // Если новый автомобиль, розничная цена обязательна
      if (data.new && !data.price_retail_rmb) {
        return false
      }
      return true
    },
    {
      message: "Укажите розничную цену для нового автомобиля",
      path: ["price_retail_rmb"],
    }
  )
