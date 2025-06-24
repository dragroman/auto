import { submitWebformAction } from "../api/actions"
import { CallbackFormSchema } from "./formSchema"

export function useCallbackForm() {
  const submitForm = async (data: CallbackFormSchema) => {
    const result = await submitWebformAction(data)

    if (!result.success) {
      throw new Error(result.error || "Ошибка при отправке формы")
    }

    return result
  }

  return {
    submitForm,
  }
}
