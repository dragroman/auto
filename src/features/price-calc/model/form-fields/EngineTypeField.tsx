"use client"

import React from "react"
import { Battery, Fuel, Zap } from "lucide-react"
import { cn } from "@shared/lib/utils"
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"

import { FormValues, useCalculatorForm } from "../useFormContext"
import { useTranslations } from "next-intl"

export const EngineTypeField = ({ name }: { name: keyof FormValues }) => {
  const t = useTranslations("form.engine")
  const { control } = useCalculatorForm()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{t("label")}</FormLabel>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 transition-colors",
                field.value === "gas" && "border-2 border-primary bg-primary/5"
              )}
              onClick={() => field.onChange("gas")}
            >
              <div className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-primary/10 hidden md:flex">
                <Fuel
                  className={cn(
                    "h-6 w-6",
                    field.value === "gas"
                      ? "text-primary"
                      : "text-muted-foreground/50"
                  )}
                />
              </div>
              <div className="text-center font-medium">{t("gas.title")}</div>
              <FormDescription className="text-center hidden md:flex">
                {t("gas.description")}
              </FormDescription>
            </div>

            <div
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 transition-colors",
                field.value === "hybrid" &&
                  "border-2 border-primary bg-primary/5"
              )}
              onClick={() => field.onChange("hybrid")}
            >
              <div className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-primary/10 hidden md:flex">
                <Zap
                  className={cn(
                    "h-6 w-6",
                    field.value === "hybrid"
                      ? "text-primary"
                      : "text-muted-foreground/50"
                  )}
                />
              </div>
              <div className="text-center font-medium">{t("hybrid.title")}</div>
              <FormDescription className="text-center hidden md:flex">
                {t("hybrid.description")}
              </FormDescription>
            </div>

            <div
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-md border p-4 transition-colors",
                field.value === "electric" &&
                  "border-2 border-primary bg-primary/5"
              )}
              onClick={() => field.onChange("electric")}
            >
              <div className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-primary/10 hidden md:flex">
                <Battery
                  className={cn(
                    "h-6 w-6",
                    field.value === "electric"
                      ? "text-primary"
                      : "text-muted-foreground/50"
                  )}
                />
              </div>
              <div className="text-center font-medium">
                {t("electric.title")}
              </div>
              <FormDescription className="text-center hidden md:flex">
                {t("electric.description")}
              </FormDescription>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
