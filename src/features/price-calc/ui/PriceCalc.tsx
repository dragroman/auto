"use client"

import { PriceCalculatorForm } from "./PriceCalculatorForm"
import { useCalculator } from "../api/useCalculator"
import { NodeCalculationDrawer } from "@entities/node-calculation"

export const PriceCalc = () => {
  const {
    calculationResults,
    isCalculating,
    calculationError,
    handleFormSubmit,
    isLimited,
    requestCount,
    maxRequests,
    // Новые состояния для Drawer
    showResultsDrawer,
    closeResultsDrawer,
  } = useCalculator()

  return (
    <>
      <div>
        <PriceCalculatorForm
          onSubmit={handleFormSubmit}
          isSubmitting={isCalculating}
          error={calculationError}
          disabled={isLimited}
        />
      </div>

      {/* Drawer с результатами расчета */}
      {calculationResults && (
        <NodeCalculationDrawer
          calc={calculationResults}
          loading={false}
          error={null}
          isOpen={showResultsDrawer}
          onClose={closeResultsDrawer}
          actions={
            // Можно добавить кнопку "Сохранить расчет" или другие действия
            <div className="text-sm text-muted-foreground">
              Расчет выполнен успешно!
            </div>
          }
        />
      )}
    </>
  )
}
