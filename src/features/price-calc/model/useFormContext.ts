import { useFormContext as useReactHookFormContext } from "react-hook-form"
import { z } from "zod"
import { formSchema } from "./schema"

export type FormValues = z.infer<typeof formSchema>

// Кастомный типизированный хук
export const useCalculatorForm = () => {
  return useReactHookFormContext<FormValues>()
}
