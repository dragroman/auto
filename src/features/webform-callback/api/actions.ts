"use server"

import { drupal } from "@shared/lib/drupal"
import {
  callbackFormSchema,
  type CallbackFormSchema,
} from "../model/formSchema"
import { getServerSession } from "next-auth"
import { authOptions } from "@features/auth/session"

export async function submitWebformAction(data: CallbackFormSchema) {
  try {
    // Валидация на сервере
    const validatedData = callbackFormSchema.parse(data)

    const url = drupal.buildUrl("/webform_rest/submit")

    // Подготовка заголовков
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // Попытка получить токен из сессии (NextAuth.js)
    try {
      const session = await getServerSession(authOptions)
      if (session?.accessToken) {
        headers.Authorization = `Bearer ${session.accessToken}`
      }
    } catch {
      // Если не удалось получить сессию, продолжаем без токена
    }

    // Submit to Drupal
    const result = await drupal.fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify({
        webform_id: "callback",
        phone: validatedData.phone,
        name: validatedData.name,
      }),
      headers,
    })

    if (!result.ok) {
      const errorData = await result.text()
      console.error("Drupal error:", errorData)
      throw new Error("Ошибка при отправке формы в Drupal")
    }

    return { success: true }
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: "Произошла неизвестная ошибка" }
  }
}
