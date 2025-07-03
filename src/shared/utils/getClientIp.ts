// src/shared/utils/getClientIp.ts
import { NextRequest } from "next/server"

/**
 * Получает реальный IP адрес клиента из различных заголовков
 * Используется в API routes для передачи реального IP в Drupal
 */
export function getClientIp(request: NextRequest): string {
  // Сначала проверяем наш собственный заголовок из middleware
  const realClientIp = request.headers.get("x-real-client-ip")
  if (realClientIp && isValidIp(realClientIp)) {
    return realClientIp
  }

  // Проверяем различные заголовки в порядке приоритета
  const ipHeaders = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "cf-connecting-ip", // Cloudflare
    "true-client-ip", // Cloudflare Enterprise
    "x-cluster-client-ip",
  ]

  // Сначала ищем публичный IP
  for (const header of ipHeaders) {
    const ip = request.headers.get(header)

    if (ip) {
      // Обрабатываем случай с несколькими IP через запятую (x-forwarded-for)
      const firstIp = ip.split(",")[0].trim()

      // Проверяем что это публичный IP
      if (isValidPublicIp(firstIp)) {
        return firstIp
      }
    }
  }

  // Если публичного нет, берем любой валидный
  for (const header of ipHeaders) {
    const ip = request.headers.get(header)

    if (ip) {
      const firstIp = ip.split(",")[0].trim()
      if (isValidIp(firstIp)) {
        return firstIp
      }
    }
  }

  // Fallback - в Next.js 13+ нет прямого доступа к IP
  // Пробуем получить из заголовков напрямую
  const remoteAddr =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"

  return remoteAddr
}

/**
 * Проверяет что IP валидный и публичный (не приватный)
 */
function isValidPublicIp(ip: string): boolean {
  if (!isValidIp(ip)) {
    return false
  }

  // Проверяем что это не приватный диапазон
  const privateRanges = [
    /^10\./, // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
    /^192\.168\./, // 192.168.0.0/16
    /^127\./, // 127.0.0.0/8 (localhost)
    /^169\.254\./, // 169.254.0.0/16 (link-local)
    /^::1$/, // IPv6 localhost
    /^fc00:/, // IPv6 private
    /^fe80:/, // IPv6 link-local
  ]

  return !privateRanges.some((range) => range.test(ip))
}

/**
 * Проверяет что IP валидный (IPv4 или IPv6)
 */
function isValidIp(ip: string): boolean {
  // Простая проверка IPv4
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

  // Простая проверка IPv6 (упрощенная)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/

  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}
