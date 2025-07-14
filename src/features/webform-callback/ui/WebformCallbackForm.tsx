"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { sendGTMEvent } from "@next/third-parties/google"
import { Check, ArrowRight } from "lucide-react"

import {
  callbackFormDefaultValues,
  callbackFormSchema,
} from "../model/formSchema"
import { useCallbackForm } from "../model/useDrupalForm"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { PhoneInput } from "@shared/ui/phone-input"

export function WebformCallbackForm({ nodeId }: { nodeId?: string }) {
  const { submitForm } = useCallbackForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof callbackFormSchema>>({
    resolver: zodResolver(callbackFormSchema),
    defaultValues: callbackFormDefaultValues,
  })

  async function onSubmit(values: z.infer<typeof callbackFormSchema>) {
    try {
      setIsSubmitting(true)
      setError(null)

      await submitForm({ ...values, nodeId })

      setIsSuccess(true)
      form.reset()

      sendGTMEvent({
        event: "form_submit_success",
        form_name: "callbackForm",
      })
    } catch (error) {
      console.error("Ошибка при отправке формы:", error)
      setError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при отправке формы"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-green-100 rounded-full p-3 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-green-600 mb-2">
          Заявка успешно отправлена!
        </h3>
        <p className="text-gray-600 text-center">
          Наши специалисты свяжутся с вами в ближайшее время
        </p>
        <Button className="mt-6" onClick={() => setIsSuccess(false)}>
          Отправить еще одну заявку
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Ваше имя</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Иван Иванов" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Телефон (обязательно)</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    placeholder="+7 (999) 999-99-99"
                    defaultCountry="RU"
                    international
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Позвоните мне"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
