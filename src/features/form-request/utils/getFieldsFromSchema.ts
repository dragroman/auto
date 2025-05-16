import { ZodObject } from "zod"

export function getFieldsFromSchema(
  schema: ZodObject<any>,
  meta: Record<string, FieldMeta>
) {
  return Object.keys(schema.shape).map((key) => ({
    name: key,
    ...meta[key],
  }))
}
