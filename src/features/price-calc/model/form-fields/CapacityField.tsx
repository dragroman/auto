"use client"

import React, { useState } from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select"
import { Button } from "@shared/ui/button"
import { useFormContext } from "react-hook-form"
import { FormValues } from "../useFormContext"
import { Popover, PopoverTrigger, PopoverContent } from "@shared/ui/popover"
import { NumberInputField } from "./NumberInputField"
import { useTranslations } from "next-intl"
import { Input } from "@shared/ui/input"

const PRESET_CAPACITIES = [
  { value: 690, label: "0.7" },
  { value: 790, label: "0.8" },
  { value: 990, label: "1.0" },
  { value: 1090, label: "1.1" },
  { value: 1190, label: "1.2" },
  { value: 1290, label: "1.3" },
  { value: 1390, label: "1.4" },
  { value: 1490, label: "1.5" },
  { value: 1555, label: "1.6" },
  { value: 1690, label: "1.7" },
  { value: 1790, label: "1.8" },
  { value: 1890, label: "1.9" },
  { value: 1990, label: "2.0" },
  { value: 2190, label: "2.2" },
  { value: 2290, label: "2.3" },
  { value: 2390, label: "2.4" },
  { value: 2490, label: "2.5" },
  { value: 2690, label: "2.7" },
  { value: 2790, label: "2.8" },
  { value: 2990, label: "3.0" },
  { value: 3190, label: "3.2" },
  { value: 3290, label: "3.3" },
  { value: 3490, label: "3.5" },
  { value: 3590, label: "3.6" },
  { value: 3990, label: "4.0" },
  { value: 4190, label: "4.2" },
  { value: 4390, label: "4.4" },
  { value: 4490, label: "4.5" },
  { value: 4590, label: "4.6" },
  { value: 4690, label: "4.7" },
  { value: 4990, label: "5.0" },
  { value: 5490, label: "5.5" },
  { value: 5690, label: "5.7" },
  { value: 5990, label: "6.0" },
]

export const CapacityField = ({
  name,
  label,
  description,
}: {
  name: keyof FormValues
  label: string
  description: string
}) => {
  const t = useTranslations("form.engine.capacity")
  const { control, setValue, watch, clearErrors } = useFormContext()
  const [showCustomInput, setShowCustomInput] = useState(false)

  // Следим за значением поля
  const currentValue = watch(name)

  // Проверяем, есть ли текущее значение среди готовых вариантов
  const isPresetValue = PRESET_CAPACITIES.some(
    (preset) => preset.value === currentValue
  )

  // Если значение не из готовых и не пустое - показываем custom input
  React.useEffect(() => {
    if (currentValue && !isPresetValue) {
      setShowCustomInput(true)
    }
  }, [currentValue, isPresetValue])

  const handleSelectChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true)
      setValue(name, "")
    } else {
      setShowCustomInput(false)
      setValue(name, parseInt(value), {
        shouldValidate: true,
        shouldDirty: true,
      })
      clearErrors(name) // Очищаем ошибки при выборе значения
    }
  }

  const handleCustomToggle = () => {
    if (showCustomInput) {
      // Возвращаемся к селекту
      setShowCustomInput(false)
      setValue(name, undefined)
      clearErrors(name) // Очищаем ошибки валидации
    } else {
      // Переходим к кастомному вводу
      setShowCustomInput(true)
      setValue(name, "")
    }
  }

  if (showCustomInput) {
    return (
      <div className="space-y-2">
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {label}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0"
                      >
                        ?
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">{description}</div>
                    </PopoverContent>
                  </Popover>
                </div>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    value={field.value}
                    min={0}
                    step={100}
                    onChange={(e) => {
                      let raw = e.target.value
                        .replace(/\s/g, "")
                        .replace(/,/g, "")
                      const num = Number(raw)
                      field.onChange(isNaN(num) ? "" : num)
                    }}
                  />

                  <span className="absolute right-0 top-0 bottom-0 flex items-center pr-4 text-muted-foreground">
                    {"мл"}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCustomToggle}
          className="text-xs w-full"
        >
          Выбрать из списка
        </Button>
      </div>
    )
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="flex items-center justify-between">
            <div className="flex items-center gap-2">{label}</div>
          </FormLabel>

          <FormControl>
            <Select
              value={field.value ? field.value.toString() : ""}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Объем" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {PRESET_CAPACITIES.map((capacity) => (
                  <SelectItem
                    key={capacity.value}
                    value={capacity.value.toString()}
                    className="md:text-lg"
                  >
                    {capacity.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCustomToggle}
            className=""
          >
            Указать в мл
          </Button>
        </FormItem>
      )}
    />
  )
}
