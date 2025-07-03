// src/app/api/price-calculator/route.ts
import { NextRequest, NextResponse } from "next/server"
import { PriceCalculatorFormData } from "@features/price-calc"
import { revalidateTag } from "next/cache"
import { TNodeCalculationFull } from "@entities/node-calculation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@features/auth/session"
import { getClientIp } from "@shared/utils/getClientIp"

export async function POST(request: NextRequest) {
  try {
    const formData: PriceCalculatorFormData = await request.json()

    // Получите URL-адрес API Drupal из переменных окружения
    const apiUrl =
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/v1/price-calculator` ||
      "http://drupal.test/api/v1/price-calculator"

    // Получаем реальный IP пользователя
    const clientIp = getClientIp(request)

    // Отправляем запрос к Drupal API
    const session = await getServerSession(authOptions)
    const accessToken = session?.accessToken

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      // Передаем реальный IP пользователя в Drupal
      "X-Forwarded-For": clientIp,
      "X-Real-IP": clientIp,
      "X-Client-IP": clientIp,
    }

    // Добавляем авторизацию если есть токен
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    // Передаем все оригинальные заголовки, которые могут содержать IP
    const forwardHeaders = [
      "x-forwarded-for",
      "x-real-ip",
      "x-client-ip",
      "cf-connecting-ip",
      "true-client-ip",
      "user-agent",
      "referer",
    ]

    forwardHeaders.forEach((headerName) => {
      const headerValue = request.headers.get(headerName)
      if (headerValue) {
        headers[headerName] = headerValue
      }
    })

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
    })

    console.log("Client IP being sent to Drupal:", clientIp)
    console.log("Form data:", formData)

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
