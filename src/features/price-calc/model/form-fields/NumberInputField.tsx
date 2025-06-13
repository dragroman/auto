"use client"

import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { Input } from "@shared/ui/input"
import { useFormContext } from "react-hook-form"
import { FormValues } from "../useFormContext"
import { Popover, PopoverTrigger, PopoverContent } from "@shared/ui/popover"
import { Button } from "@shared/ui/button"

export const NumberInputField = ({
  name,
  label,
  description,
  min = 0,
  step = 0,
  currency = "",
}: {
  name: keyof FormValues
  label: string
  description: string
  min: number
  step: number
  currency?: string
}) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">?</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">{description}</div>
              </PopoverContent>
            </Popover>
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="p-4 md:text-2xl h-auto"
                type="text"
                value={
                  field.value !== undefined &&
                  field.value !== null &&
                  field.value !== ""
                    ? currency
                      ? Number(field.value).toLocaleString("ru-RU")
                      : field.value
                    : ""
                }
                onChange={(e) => {
                  let raw = e.target.value.replace(/\s/g, "").replace(/,/g, "")
                  if (currency) raw = raw.replace(currency, "")
                  const num = Number(raw)
                  field.onChange(isNaN(num) ? "" : num)
                }}
                min={min}
                step={step}
              />
              {currency && (
                <span className="absolute right-0 top-0 bottom-0 flex items-center pr-4 text-xl text-muted-foreground">
                  {currency}
                </span>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
