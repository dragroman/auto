"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@shared/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form"
import { Input } from "@shared/ui/input"
import { fieldsMeta, fieldsSchema } from "../model/schema"
import { getFieldsFromSchema } from "../utils/getFieldsFromSchema"

export function FormRequest() {
  const form = useForm({
    resolver: zodResolver(fieldsSchema),
  })

  const onSubmit = (data: z.infer<typeof fieldsSchema>) => {
    console.log(data)
  }

  const fields = getFieldsFromSchema(fieldsSchema, fieldsMeta)

  console.log(fields)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((meta) => (
          <FormField
            key={meta.name}
            name={meta.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{meta.label}</FormLabel>
                <FormControl>
                  <Input placeholder={meta.placeholder} {...field} />
                </FormControl>
                <FormDescription>{meta.help}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
