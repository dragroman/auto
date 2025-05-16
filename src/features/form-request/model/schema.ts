import { locale } from "@shared/config/i18n/messages/ru"
import { z, ZodObject, ZodTypeAny } from "zod"

const t = locale.formRequest.fields

export const fieldsSchema = z.object({
  price: z.string().min(1, t.price.error),
  name: z.string().min(1, t.name.error),
  phone: z.string().min(1, t.phone.error),
})

export const fieldsMeta: Record<string, FieldMeta> = {
  price: {
    label: t.price.label,
    placeholder: t.price.placeholder,
    error: t.price.error,
    help: t.price.help,
  },
  name: {
    label: "Имя",
    placeholder: "Иван Иванов",
    error: "Введите имя",
    help: "Введите имя",
  },
  phone: {
    label: "Телефон для связи",
    placeholder: "+7 (999) 123-45-67",
    error: "Введите телефон",
    help: "Укажите номер для связи",
  },
}
