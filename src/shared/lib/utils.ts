import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("ru-RU").format(Math.round(num))
}

export const getYearFromDate = (dateString: string) => {
  if (!dateString) return null
  return dateString.split("-")[0]
}

export function absoluteUrl(input: string) {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input
  }

  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export const isOwner = (
  entityUserId: string,
  currentUserId: string
): boolean => {
  return entityUserId === currentUserId
}
