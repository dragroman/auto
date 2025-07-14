"use server"

import { drupal } from "@shared/lib/drupal"
import { sendTelegramMessage } from "@shared/lib/telegram"
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
    let currentUser = null
    try {
      const session = await getServerSession(authOptions)
      if (session?.accessToken) {
        headers.Authorization = `Bearer ${session.accessToken}`
        currentUser = session.user
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
        node_id: validatedData.nodeId,
      }),
      headers,
    })

    if (!result.ok) {
      const errorData = await result.text()
      console.error("Drupal error:", errorData)
      throw new Error("Ошибка при отправке формы в Drupal")
    }

    // Отправляем уведомление в Telegram (без ожидания)
    sendCallbackNotificationToTelegram(validatedData, currentUser)

    return { success: true }
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: "Произошла неизвестная ошибка" }
  }
}

async function sendCallbackNotificationToTelegram(
  formData: CallbackFormSchema,
  user: any
) {
  const userName = user?.name || user?.email || "Анонимный пользователь"
  const customerName = formData.name || "Не указано"
  const nodeInfo = formData.nodeId
    ? `\n🚗 <b>Расчет ID:</b> ${formData.nodeId}`
    : ""

  const message = `
📞 <b>Запрос обратного звонка!</b>

👤 <b>Пользователь:</b> ${userName}
📝 <b>Имя клиента:</b> ${customerName}
📱 <b>Телефон:</b> ${formData.phone}
<b>Node id:</b> ${nodeInfo}

#обратныйзвонок #заявка
  `.trim()

  try {
    await sendTelegramMessage(message)
  } catch (error) {
    console.error(
      "Не удалось отправить уведомление callback в Telegram:",
      error
    )
  }
}
