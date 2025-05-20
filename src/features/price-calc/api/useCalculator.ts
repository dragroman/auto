"use client"

import { useEffect, useRef, useState } from "react"
import {
  PriceCalculatorFormData,
  PriceCalculationResults,
} from "../model/types"

export const useCalculator = () => {
  const [calculationResults, setCalculationResults] =
    useState<PriceCalculationResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculationError, setCalculationError] = useState<string | undefined>(
    undefined
  )

  // Состояние для отслеживания запросов
  const [requestCount, setRequestCount] = useState(0)
  const [isLimited, setIsLimited] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Константы лимитов
  const MAX_REQUESTS = 3 // максимум 3 запросов
  const LIMIT_PERIOD = 60 * 1000 // за 1 минуту

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

  const handleFormSubmit = async (formData: PriceCalculatorFormData) => {
    // Проверяем не превышен ли лимит
    if (isLimited) {
      setCalculationError(
        `Превышен лимит запросов. Пожалуйста, подождите и попробуйте снова через несколько минут.`
      )
      return
    }

    // Увеличиваем счетчик запросов
    const newCount = requestCount + 1
    setRequestCount(newCount)

    // Устанавливаем лимит, если превышено максимальное количество
    if (newCount >= MAX_REQUESTS) {
      setIsLimited(true)
      resetLimitPeriod()
    }

    setIsCalculating(true)
    setCalculationError(undefined)

    try {
      const response = await fetch("/api/price-calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        try {
          const errorData = await response.json()
          throw new Error(
            errorData.message || `Ошибка расчета: ${response.status}`
          )
        } catch (e) {
          throw new Error(`Ошибка расчета: ${response.status}`)
        }
      }

      const data = await response.json()
      setCalculationResults(data)
    } catch (error) {
      console.error("Error calculating price:", error)
      setCalculationError(
        error instanceof Error ? error.message : "Произошла ошибка при расчете"
      )
    } finally {
      setIsCalculating(false)
    }
  }

  return {
    calculationResults,
    isCalculating,
    calculationError,
    handleFormSubmit,
    isLimited,
    requestCount,
    maxRequests: MAX_REQUESTS,
  }
}
