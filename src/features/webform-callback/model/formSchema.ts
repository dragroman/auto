import { z } from "zod"

export type CallbackFormSchema = {
  name?: string
  phone: string
  nodeId?: string
}

const phoneRegex = /^\+?[1-9]\d{1,14}$/

export const callbackFormSchema = z.object({
  name: z.string().optional(),
  phone: z.string().regex(phoneRegex, {
    message:
      "Телефон должен быть в международном формате, например +79123456789",
  }),
  nodeId: z.string().optional(),
})

export const callbackFormDefaultValues: CallbackFormSchema = {
  name: "",
  phone: "",
}
