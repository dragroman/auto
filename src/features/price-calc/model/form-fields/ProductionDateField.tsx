"use client"

import React, { useState } from "react"
import { FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select"
import { Button } from "@shared/ui/button"
import { Check, Calendar } from "lucide-react"
import { FormValues, useCalculatorForm } from "../useFormContext"
import { useTranslations } from "next-intl"

export const ProductionDateField = ({ name }: { name: "production_date" }) => {
  const t = useTranslations("form.vehicle.production_date")
  const { control } = useCalculatorForm()
  const [showDetailedDate, setShowDetailedDate] = useState(false)
  const currentYear = new Date().getFullYear()
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2024, i, 1)
    const month = new Intl.DateTimeFormat("ru", { month: "long" }).format(date)
    return month.charAt(0).toUpperCase() + month.slice(1)
  })

  const getCategoryByDate = (date: Date) => {
    const yearDiff = currentYear - date.getFullYear()

    if (yearDiff < 3) return ageRanges[0] // "under3"
    if (yearDiff >= 3 && yearDiff < 5) return ageRanges[1] // "3to5"
    if (yearDiff >= 5 && yearDiff <= 7) return ageRanges[2] // "5to7"

    return null
  }

  // Определение диапазонов возраста
  const ageRanges = [
    {
      id: "under3",
      label: t("under3"),
      years: 3,
    },
    {
      id: "3to5",
      label: t("from3to5"),
      years: 4,
    },
    {
      id: "5to7",
      label: t("from5to7"),
      years: 6,
    },
  ]

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Функция для определения, какой диапазон выбран на основе текущей даты
        const getSelectedRange = () => {
          if (!field.value) return null

          const yearDiff = currentYear - field.value.getFullYear()

          if (yearDiff < 3) return "under3"
          if (yearDiff >= 3 && yearDiff < 5) return "3to5"
          if (yearDiff >= 5 && yearDiff <= 7) return "5to7"

          return null
        }

        const selectedRange = getSelectedRange()

        // Функция для установки даты на основе выбранного диапазона
        const setDateFromRange = (rangeId: string) => {
          let year: number

          switch (rangeId) {
            case "under3":
              year = currentYear - 2 // Середина диапазона "до 3 лет"
              break
            case "3to5":
              year = currentYear - 4 // Середина диапазона "от 3 до 5 лет"
              break
            case "5to7":
              year = currentYear - 6 // Середина диапазона "от 5 до 7 лет"
              break
            default:
              year = currentYear
          }

          const newDate = new Date(year, 0, 1) // Устанавливаем 1 января выбранного года
          field.onChange(newDate)
        }

        return (
          <FormItem className="flex flex-col space-y-3">
            <FormLabel>
              {t("label")}{" "}
              {!showDetailedDate ||
                (field.value && (
                  <span className="text-muted-foreground">
                    {getCategoryByDate(field.value)?.label || t("out_of_range")}
                  </span>
                ))}
            </FormLabel>

            {!showDetailedDate ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {ageRanges.map((range) => (
                    <div
                      key={range.id}
                      className={`
                        border rounded-lg p-3 cursor-pointer transition-all hover:bg-gray-50
                        ${selectedRange === range.id ? "border-primary ring-1 ring-primary bg-primary/5" : "border-gray-200"}
                      `}
                      onClick={() => setDateFromRange(range.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-medium text-sm">{range.label}</div>
                        {selectedRange === range.id && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {currentYear - range.years} г.
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                  onClick={() => setShowDetailedDate(true)}
                >
                  <Calendar className="h-4 w-4" />
                  {t("specify_date")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Select
                    onValueChange={(month) => {
                      const currentValue = field.value || new Date()
                      const newDate = new Date(
                        currentValue.getFullYear(),
                        parseInt(month) - 1,
                        1
                      )
                      field.onChange(newDate)
                    }}
                    value={(field.value
                      ? field.value.getMonth() + 1
                      : new Date().getMonth() + 1
                    ).toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("month_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem
                          key={index + 1}
                          value={(index + 1).toString()}
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(year) => {
                      const currentValue = field.value || new Date()
                      const newDate = new Date(
                        parseInt(year),
                        currentValue.getMonth(),
                        1
                      )
                      field.onChange(newDate)
                    }}
                    value={(field.value
                      ? field.value.getFullYear()
                      : new Date().getFullYear()
                    ).toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("year_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 7 }, (_, i) => {
                        const year = currentYear - i
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                  onClick={() => setShowDetailedDate(false)}
                >
                  {t("use_range")}
                </Button>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
