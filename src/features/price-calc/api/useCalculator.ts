// api/useCalculator.ts
"use client"

import { useEffect, useRef, useState } from "react"
import { PriceCalculatorFormData } from "../model/types"
import { TNodeCalculationFull } from "@entities/node-calculation"
import { useRouter } from "next/navigation"
import { sendGTMEvent } from "@next/third-parties/google"

interface RateLimitError {
  type: "rate_limit"
  userType: "anonymous" | "registered" | "premium"
  resetTime?: string
  message: string
}

interface CalculatorError {
  type: "general" | "rate_limit"
  message: string
  userType?: "anonymous" | "registered" | "premium"
  resetTime?: string
}

export const useCalculator = () => {
  const [calculationResults, setCalculationResults] =
    useState<TNodeCalculationFull | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculationError, setCalculationError] = useState<
    CalculatorError | undefined
  >(undefined)

  // Состояние для отслеживания запросов (локальное)
  const [requestCount, setRequestCount] = useState(0)
  const [isLimited, setIsLimited] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Новые состояния для Drawer
  const [showResultsDrawer, setShowResultsDrawer] = useState(false)

  // Константы лимитов (локальные)
  const MAX_REQUESTS = 3 // максимум 3 запросов для неавторизованных
  const LIMIT_PERIOD = 60 * 1000 // за 1 минуту

  const router = useRouter()

  // Сбрасываем счетчик по истечении заданного времени
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const resetLimitPeriod = () => {
    timeoutRef.current = setTimeout(() => {
      setRequestCount(0)
      setIsLimited(false)
    }, LIMIT_PERIOD)
  }

  const parseErrorResponse = async (
    response: Response
  ): Promise<CalculatorError> => {
    try {
      const errorData = await response.json()

      if (response.status === 429) {
        return {
          type: "rate_limit",
          message: errorData.message || "Превышен лимит запросов",
          userType: errorData.userType || "anonymous",
          resetTime: errorData.resetTime,
        }
      }

      return {
        type: "general",
        message: errorData.message || `Ошибка расчета: ${response.status}`,
      }
    } catch (e) {
      return {
        type: "general",
        message: `Ошибка расчета: ${response.status}`,
      }
    }
  }

  const handleFormSubmit = async (formData: PriceCalculatorFormData) => {
    // Проверяем локальный лимит (для превентивной защиты)
    if (isLimited) {
      setCalculationError({
        type: "rate_limit",
        message:
          "Превышен локальный лимит запросов. Пожалуйста, подождите и попробуйте снова.",
        userType: "anonymous",
      })
      return
    }

    // Увеличиваем локальный счетчик запросов
    const newCount = requestCount + 1
    setRequestCount(newCount)

    // Устанавливаем локальный лимит, если превышено максимальное количество
    if (newCount >= MAX_REQUESTS) {
      setIsLimited(true)
      resetLimitPeriod()
    }

    setIsCalculating(true)
    setCalculationError(undefined)
    // Закрываем предыдущий drawer если был открыт
    setShowResultsDrawer(false)

    try {
      const response = await fetch("/api/price-calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        console.log(response)
        const error = await parseErrorResponse(response)
        throw error
      }

      const data = await response.json()
      router.refresh()

      sendGTMEvent({
        event: "form_submit_success",
        form_name: "priceCalcForm",
      })

      // Загружаем полные данные для Drawer
      try {
        const fullDataResponse = await fetch(
          `/api/price-calculator/calc/${data.node_id}`
        )
        if (fullDataResponse.ok) {
          const fullData = await fullDataResponse.json()
          setCalculationResults(fullData)
        } else {
          // Fallback: используем базовые данные
          setCalculationResults(data)
        }
      } catch (error) {
        console.error("Ошибка загрузки полных данных:", error)
        // Fallback: используем базовые данные
        setCalculationResults(data)
      }

      // Открываем drawer с результатами
      setShowResultsDrawer(true)
    } catch (error) {
      console.error("Error calculating price:", error)

      if (error && typeof error === "object" && "type" in error) {
        setCalculationError(error as CalculatorError)
      } else {
        setCalculationError({
          type: "general",
          message:
            error instanceof Error
              ? error.message
              : "Произошла ошибка при расчете",
        })
      }
    } finally {
      setIsCalculating(false)
    }
  }

  const closeResultsDrawer = () => {
    setShowResultsDrawer(false)
  }

  const handleRegisterClick = () => {
    // Перенаправляем на страницу регистрации
    router.push("/auth/register")
  }

  const handleContactClick = () => {
    // Перенаправляем на страницу контактов или открываем модальное окно
    router.push("/contact")
  }

  const clearError = () => {
    setCalculationError(undefined)
  }

  return {
    calculationResults,
    isCalculating,
    calculationError,
    handleFormSubmit,
    handleRegisterClick,
    handleContactClick,
    clearError,
    isLimited,
    requestCount,
    maxRequests: MAX_REQUESTS,
    // Новые методы для Drawer
    showResultsDrawer,
    closeResultsDrawer,
  }
}
