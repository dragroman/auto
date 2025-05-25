"use client"

import { PriceCalculatorForm } from "./PriceCalculatorForm"
import { useCalculator } from "../api/useCalculator"
import { NodeCalculationFull } from "@entities/node-calculation"

export const PriceCalc = () => {
  const {
    calculationResults,
    isCalculating,
    calculationError,
    handleFormSubmit,
    isLimited,
    requestCount,
    maxRequests,
  } = useCalculator()

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">
        Калькулятор стоимости автомобиля
      </h1>

      {/* Информация о лимите запросов
      <div className="mb-4">
        <p
          className={`text-sm ${isLimited ? "text-red-500" : "text-muted-foreground"}`}
        >
          Доступно запросов: {maxRequests - requestCount} из {maxRequests}
          {isLimited && " (лимит исчерпан, подождите некоторое время)"}
        </p>
      </div> */}

      <div>
        <PriceCalculatorForm
          onSubmit={handleFormSubmit}
          isSubmitting={isCalculating}
          error={calculationError}
          disabled={isLimited}
        />
      </div>
    </div>
  )
}
