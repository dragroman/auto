"use client"

import React, { useEffect } from "react"
import { Resolver, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { RefreshCw } from "lucide-react"
import { Button } from "@shared/ui/button"
import { Alert, AlertDescription } from "@shared/ui/alert"
import { Form } from "@shared/ui/form"
import { PriceCalculatorFormData } from "../model/types"
import { formSchema } from "../model/schema"
import { locale } from "@shared/config/i18n/messages/ru"
import {
  EngineTypeField,
  NumberInputField,
  ProductionDateField,
  VehicleConditionField,
} from "../model/form-fields"

interface PriceCalculatorFormProps {
  onSubmit: (data: PriceCalculatorFormData) => void
  isSubmitting: boolean
  error?: string
  disabled?: boolean
}

export const PriceCalculatorForm: React.FC<PriceCalculatorFormProps> = ({
  onSubmit,
  isSubmitting,
  error,
  disabled = false,
}) => {
  const t = locale.form

  // Определяем начальные значения строго типизированными
  const defaultValues: z.infer<typeof formSchema> = {
    new: true,
    engine_type: "gas",
    profit_rmb: 5000,
    domestic_shipping_rmb: 0,
    additional_expenses_rmb: 0,
    price_actual_rmb: 0,
    price_retail_rmb: 0,
    capacity_ml: 0,
    horsepower: 0,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues,
    mode: "onChange",
  })

  const isNewVehicle = form.watch("new")
  const engineType = form.watch("engine_type")
  const priceActual = form.watch("price_actual_rmb")

  useEffect(() => {
    if (
      form.formState.isDirty &&
      priceActual !== undefined &&
      priceActual !== null
    ) {
      form.setValue("price_retail_rmb", priceActual, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }, [priceActual, form])

  // Используем встроенное свойство isDirty вместо кастомной логики
  const { isDirty, isValid } = form.formState

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert the form values to match API expected format
    const formData: PriceCalculatorFormData = {
      ...values,
      production_date: values.production_date
        ? format(values.production_date, "yyyy-MM-dd")
        : undefined,
    }

    onSubmit(formData)
  }

  // Добавляем функцию сброса формы
  const resetForm = () => {
    form.reset(defaultValues)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Состояние автомобиля (новый/б/у) */}
        <VehicleConditionField name="new" />

        {/* Дата производства (только для б/у) */}
        {!isNewVehicle && <ProductionDateField name="production_date" />}

        {/* Тип двигателя */}
        <EngineTypeField name="engine_type" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {/* Цена автомобиля */}
          <NumberInputField
            name="price_actual_rmb"
            label={t.price.actual}
            min={0}
            step={10000}
            currency="¥"
          />
          {/* Розничная цена (только для новых) */}
          {isNewVehicle && (
            <NumberInputField
              name="price_retail_rmb"
              label={t.price.retail}
              min={0}
              step={10000}
              currency="¥"
            />
          )}
          {/* Объем двигателя (для бензиновых и гибридных) */}
          {(engineType === "gas" || engineType === "hybrid") && (
            <NumberInputField
              name="capacity_ml"
              label={t.engine.capacity}
              min={0}
              step={100}
            />
          )}
          {/* Мощность двигателя (для электрических и гибридных) */}
          {(engineType === "electric" || engineType === "hybrid") && (
            <NumberInputField
              name="horsepower"
              label={t.engine.power}
              min={0}
              step={10}
            />
          )}
        </div>

        {/* Кнопки отправки и сброса */}
        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting || !isValid || disabled}
          >
            {isSubmitting ? t.submitting : t.submit}
          </Button>

          {/* Кнопка сброса - отображается только если форма изменена */}
          {isDirty && (
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {t.reset}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
