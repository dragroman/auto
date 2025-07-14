import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Получаем продукт через серверную функцию
    const product = await fetchProduct(id)

    // Возвращаем продукт как JSON
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

const fetchProduct = async (id: string) => {
  const request = new DrupalJsonApiParams().addFilter("status", "1")

  const product = await drupal.getResourceByPath(`/node/${id}`, {
    params: request.getQueryObject(),
    next: { revalidate: 3600 },
  })

  return product
}
