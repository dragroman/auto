import { NextResponse } from "next/server"
import { PriceCalculatorFormData } from "@features/price-calc"
import { revalidateTag } from "next/cache"
import { TNodeCalculationFull } from "@entities/node-calculation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@features/auth/session"

export async function POST(request: Request) {
  try {
    const formData: PriceCalculatorFormData = await request.json()

    // Получите URL-адрес API Drupal из переменных окружения
    const apiUrl =
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/v1/price-calculator` ||
      "http://drupal.test/api/v1/price-calculator"

    // Отправляем запрос к Drupal API
    const session = await getServerSession(authOptions) // импортируйте getServerSession и authOptions
    const accessToken = session?.accessToken

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(formData),
    })

    console.log(formData)

    if (!response.ok) {
      // Попытка получить сообщение об ошибке из ответа
      let errorMessage = `Ошибка API: ${response.status}`
      let errorType = "general"
      let userType = undefined
      let resetTime = undefined
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
        errorType =
          errorData.type || (response.status === 429 ? "rate_limit" : "general")
        userType = errorData.userType
        resetTime = errorData.resetTime
      } catch (e) {
        // Если не удалось распарсить JSON, используем стандартное сообщение
      }

      console.error("API Error:", errorMessage)
      return NextResponse.json(
        { message: errorMessage, type: errorType, userType, resetTime },
        { status: response.status }
      )
    }

    const data = (await response.json()) as TNodeCalculationFull

    revalidateTag("calculations")
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in price calculator API:", error)
    return NextResponse.json(
      {
        message: "Ошибка при выполнении запроса к API",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
