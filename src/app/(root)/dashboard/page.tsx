import Link from "next/link"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession } from "next-auth/next"
import { PageTitle } from "@shared/ui/page-title"
import { Button } from "@shared/ui/button"
import { drupal } from "@shared/lib/drupal"
import { authOptions } from "@features/auth/session"
import { SignOut } from "@features/auth/sign-out"
import { User, UserStats } from "@entities/user"
import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { ViewsCalculation } from "@widgets/views-calculation"
import { DashboardFilters } from "@widgets/dashboard-filters"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Личный кабинет",
  description: "Личный кабинет пользователя",
  robots: {
    index: false,
    follow: false,
  },
}

interface DashboardProps {
  searchParams: Promise<{
    status?: string
    engine_type?: string
    page?: string
  }>
}

// Функция для построения фильтров API
function buildApiFilters(
  searchParams: Awaited<DashboardProps["searchParams"]>,
  userId: string
) {
  const api = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFilter("uid.id", userId)
    .addSort("-created")
    .addPageLimit(20)

  // Фильтр по статусу
  if (searchParams.status && searchParams.status !== "all") {
    api.addFilter("field_status", searchParams.status)
  }

  // Фильтр по типу двигателя
  if (searchParams.engine_type && searchParams.engine_type !== "all") {
    api.addFilter("field_car_type", searchParams.engine_type)
  }

  // Пагинация
  if (searchParams.page) {
    const page = parseInt(searchParams.page) - 1
    api.addPageOffset(page * 20)
  }

  return api
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="space-y-4">
        <PageTitle title="Личный кабинет" />
        <div className="text-center py-8">
          <p className="mb-4">
            Для доступа к личному кабинету необходимо войти в систему
          </p>
          <Button asChild>
            <Link href="/signin">Войти</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentUser = session.user.id

  // Дожидаемся получения searchParams
  const resolvedSearchParams = await searchParams

  // Строим параметры API с учетом фильтров
  const apiParams = buildApiFilters(resolvedSearchParams, currentUser)

  try {
    const nodes = await drupal.getResourceCollection<TNodeCalculationTeaser[]>(
      "node--calculation",
      {
        params: apiParams.getQueryObject(),
        next: { revalidate: 300, tags: ["calculations"] },
      }
    )

    const hasFilters = Object.values(resolvedSearchParams).some(
      (value) => value && value !== "all" && value !== ""
    )

    return (
      <div className="space-y-6">
        <PageTitle title="Личный кабинет" />

        {/* Информация о пользователе */}
        <User user={session.user} />

        <UserStats currentUser={currentUser} />

        {/* Фильтры */}
        <DashboardFilters />

        {/* Результаты с фильтрацией */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {hasFilters ? "Результаты поиска" : "Мои расчёты"}
            </h2>
            <div className="text-sm text-muted-foreground"></div>
          </div>

          {nodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">
                {hasFilters ? "Ничего не найдено" : "У вас пока нет расчётов"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {hasFilters
                  ? "Попробуйте изменить параметры поиска или сбросить фильтры"
                  : "Создайте свой первый расчёт стоимости автомобиля"}
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <Link href="/calc">Создать расчёт</Link>
                </Button>
                {hasFilters && (
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Сбросить фильтры</Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <ViewsCalculation nodes={nodes} currentUserID={currentUser} />
          )}
        </div>

        <SignOut />
      </div>
    )
  } catch (error) {
    console.error("Ошибка загрузки данных Dashboard:", error)

    return (
      <div className="space-y-4">
        <PageTitle title="Личный кабинет" />
        <User user={session.user} />

        <div className="text-center py-12">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium mb-2">Ошибка загрузки данных</h3>
          <p className="text-muted-foreground mb-4">
            Не удалось загрузить ваши расчёты. Попробуйте обновить страницу.
          </p>
          <Button onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>
        </div>
      </div>
    )
  }
}
