"use client"

import React from "react"
import { Car, CheckCircle } from "lucide-react"
import { cn } from "@shared/lib/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { useFormContext } from "react-hook-form"
import { FormValues } from "../useFormContext"
import { useTranslations } from "next-intl"

export const VehicleConditionField = ({ name }: { name: keyof FormValues }) => {
  const { control } = useFormContext()
  const t = useTranslations("form.vehicle")
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel>{t("condition.label")}</FormLabel>
          <div className="flex gap-4">
            <div
              className={cn(
                "flex flex-1 cursor-pointer flex-col items-center justify-center rounded-md border p-4 transition-colors",
                field.value === true && "border-2 border-primary bg-primary/5"
              )}
              onClick={() => field.onChange(true)}
            >
              <div className="hidden md:flex mb-2 h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle
                  className={cn(
                    "h-6 w-6",
                    field.value === true
                      ? "text-primary"
                      : "text-muted-foreground/50"
                  )}
                />
              </div>
              <div className="text-center font-medium">
                {t("condition.new.title")}
              </div>
              <FormDescription className="text-center hidden md:flex">
                {t("condition.new.description")}
              </FormDescription>
            </div>

            <div
              className={cn(
                "flex flex-1 cursor-pointer flex-col items-center justify-center rounded-md border p-4 transition-colors",
                field.value === false && "border-2 border-primary bg-primary/5"
              )}
              onClick={() => field.onChange(false)}
            >
              <div className="hidden md:flex mb-2 h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Car
                  className={cn(
                    "h-6 w-6",
                    field.value === false
                      ? "text-primary"
                      : "text-muted-foreground/50"
                  )}
                />
              </div>
              <div className="text-center font-medium">
                {t("condition.used.title")}
              </div>
              <FormDescription className="text-center hidden md:flex">
                {t("condition.used.description")}
              </FormDescription>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
