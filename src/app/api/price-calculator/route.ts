import { NextResponse } from "next/server"
import { PriceCalculatorFormData } from "@features/price-calc"
import { revalidateTag } from "next/cache"
import { TNodeCalculationFull } from "@entities/node-calculation"

export async function POST(request: Request) {
  try {
    const formData: PriceCalculatorFormData = await request.json()

    // Получите URL-адрес API Drupal из переменных окружения
    const apiUrl =
      process.env.DRUPAL_API_URL || "http://car.test/api/v1/price-calculator"

    // Отправляем запрос к Drupal API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      // Попытка получить сообщение об ошибке из ответа
      let errorMessage = `Ошибка API: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // Если не удалось распарсить JSON, используем стандартное сообщение
      }

      console.error("API Error:", errorMessage)
      return NextResponse.json(
        { message: errorMessage },
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
