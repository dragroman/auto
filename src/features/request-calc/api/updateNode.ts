"use server"

import { authOptions } from "@features/auth/session"
import { drupal } from "@shared/lib/drupal"
import { sendTelegramMessage } from "@shared/lib/telegram"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"

type NodeUpdateData = {
  field_model: string
  field_remarks?: string
}

export async function updateNodeDataAction(
  nodeId: string,
  nodeType: string,
  updateData: NodeUpdateData
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      throw new Error("Пользователь не авторизован")
    }

    const currentNode = await drupal.getResource(nodeType, nodeId, {
      withAuth: () => `Bearer ${session.accessToken}`,
    })

    // Проверяем статус
    if (currentNode.field_status === "requested") {
      return {
        success: false,
        error: "Заявка уже подана и находится на рассмотрении",
      }
    }

    const dataToUpdate = {
      ...updateData,
      field_status: "requested",
    }

    const updatedNode = await drupal.updateResource(
      nodeType,
      nodeId,
      {
        data: {
          attributes: dataToUpdate,
        },
      },
      {
        withAuth: () => `Bearer ${session.accessToken}`,
      }
    )

    // Отправляем уведомление в Telegram (без ожидания)
    sendNotificationToTelegram(updatedNode, session.user)

    // Инвалидируем кэш для этой страницы
    revalidateTag("calculations")
    revalidateTag("user_stats")

    return { success: true, node: updatedNode }
  } catch (error) {
    console.error("Ошибка при обновлении ноды:", error)

    if (error instanceof Error) {
      return { success: false, error: error.message }
    }

    return { success: false, error: "Произошла ошибка при обновлении" }
  }
}

async function sendNotificationToTelegram(node: any, user: any) {
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!chatId) {
    console.warn("TELEGRAM_CHAT_ID не настроен")
    return
  }

  const userName = user?.name || user?.email || "Неизвестный пользователь"
  const nodeName = node.title || `Расчет #${node.id}`

  const message = `
🚗 <b>Новая заявка на расчет!</b>

👤 <b>Пользователь:</b> ${userName}
📋 <b>Расчет:</b> ${nodeName}
🚙 <b>Модель:</b> ${node.field_model || "Не указана"}
💬 <b>Примечания:</b> ${node.field_remarks || "Отсутствуют"}

#заявка #расчет
  `.trim()

  try {
    await sendTelegramMessage(message)
  } catch (error) {
    console.error("Не удалось отправить уведомление в Telegram:", error)
  }
}
