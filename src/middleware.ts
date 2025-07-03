import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const authRoutes = ["/signin", "/signup"]
const protectedRoutes = ["/dashboard", "/profile", "/settings"]

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Проверяем, является ли маршрут защищенным
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Если пользователь авторизован
  if (token) {
    // И пытается зайти на страницы авторизации
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Разрешаем доступ к защищенным и публичным страницам
    return NextResponse.next()
  }

  // Если пользователь НЕ авторизован
  if (!token) {
    // И пытается зайти на защищенную страницу
    if (isProtectedRoute) {
      // Сохраняем URL для редиректа после авторизации
      const loginUrl = new URL("/signin", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Разрешаем доступ к публичным и авторизационным страницам
    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith("/api/")) {
    // Получаем реальный IP клиента из заголовков
    const clientIp = extractClientIp(req)

    // Создаем новые заголовки с добавлением реального IP
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-real-client-ip", clientIp)

    // Логируем для отладки (можно убрать в продакшене)
    console.log(
      `[Middleware] API route: ${req.nextUrl.pathname}, Client IP: ${clientIp}`
    )

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

/**
 * Извлекает IP клиента из заголовков запроса
 */
function extractClientIp(request: NextRequest): string {
  const ipHeaders = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "cf-connecting-ip",
    "true-client-ip",
  ]

  // Проверяем заголовки в порядке приоритета
  for (const header of ipHeaders) {
    const ip = request.headers.get(header)

    if (ip) {
      // Для X-Forwarded-For берем первый IP (клиент)
      const firstIp = ip.split(",")[0].trim()

      if (isValidIp(firstIp)) {
        return firstIp
      }
    }
  }

  // Fallback
  return "127.0.0.1"
}

/**
 * Проверяет валидность IP адреса
 */
function isValidIp(ip: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/

  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
