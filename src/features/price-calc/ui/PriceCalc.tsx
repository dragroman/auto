"use client"

import { PriceCalculatorForm } from "./PriceCalculatorForm"
import { useCalculator } from "../api/useCalculator"
import { NodeCalculationDrawer } from "@entities/node-calculation"
import { RequestCalc } from "@features/request-calc"

export const PriceCalc = ({ currentUserID }: { currentUserID: string }) => {
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
    <div className="mb-4">
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
            <RequestCalc
              className="w-full"
              node={calculationResults}
              currentUserID={currentUserID}
            />
          }
        />
      )}
    </div>
  )
}
