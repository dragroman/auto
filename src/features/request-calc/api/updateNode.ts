"use server"

import { authOptions } from "@features/auth/session"
import { drupal } from "@shared/lib/drupal"
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
