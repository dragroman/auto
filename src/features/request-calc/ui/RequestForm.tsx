import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateNodeDataAction } from "../api/updateNode"
import { Input } from "@shared/ui/input"
import { Textarea } from "@shared/ui/textarea"
import { Button } from "@shared/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { toast } from "sonner"

export const RequestCalcForm = ({
  nodeId,
  nodeType,
  onClose,
}: {
  nodeId: string
  nodeType: string
  onClose?: () => void
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const clarificationSchema = z.object({
    model: z.string().min(1, "Поле обязательно для заполнения"),
    notes: z.string().optional(),
  })
  type ClarificationFormData = z.infer<typeof clarificationSchema>

  const form = useForm<ClarificationFormData>({
    resolver: zodResolver(clarificationSchema),
    defaultValues: {
      model: "",
      notes: "",
    },
  })

  async function onSubmit(values: ClarificationFormData) {
    try {
      setIsSubmitting(true)

      const result = await updateNodeDataAction(nodeId, nodeType, {
        field_model: values.model,
        field_remarks: values.notes,
      })

      if (!result.success) {
        toast.error(result.error)
        setIsSuccess(false)
        setIsSubmitting(false)
        return
      }

      setIsSuccess(true)
      form.reset()

      // Закрываем модальное окно через 2 секунды после успеха
      setTimeout(() => {
        setIsSuccess(false)
        onClose?.() // Вызываем функцию закрытия
      }, 2000)
    } catch (error) {
      console.error("Ошибка при обновлении:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Если форма успешно отправлена, показываем сообщение об успехе
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-green-100 rounded-full p-3 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-green-600 mb-2">
          Данные успешно обновлены!
        </h3>
        <p className="text-gray-600 text-center">
          Информация сохранена и будет учтена при расчете
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Модель</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Toyota Fielder" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дополнительные примечания</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Любые дополнительные комментарии..."
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose} // Используем переданную функцию
          >
            Отменить
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Сохранение..." : "Сохранить"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
