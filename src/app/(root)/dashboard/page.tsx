import Link from "next/link"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession } from "next-auth/next"
import { PageTitle } from "@shared/ui/page-title"
import { Button } from "@shared/ui/button"
import { drupal } from "@shared/lib/drupal"
import { authOptions } from "@features/auth/session"
import { SignOut } from "@features/auth/sign-out"
import { User } from "@entities/user"
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
    date_from?: string
    date_to?: string
    price_from?: string
    price_to?: string
    search?: string
    page?: string
  }>
}

interface TotalCountProps {
  data: {
    attributes: TNodeCalculationTeaser[]
  }
  meta: {
    count: number
  }
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

  // Фильтр по диапазону дат
  if (searchParams.date_from) {
    api.addFilter("created", searchParams.date_from, ">=")
  }
  if (searchParams.date_to) {
    // Добавляем время до конца дня
    const endDate = new Date(searchParams.date_to)
    endDate.setHours(23, 59, 59, 999)
    api.addFilter("created", endDate.toISOString(), "<=")
  }

  // Фильтр по диапазону цен
  if (searchParams.price_from) {
    api.addFilter(
      "field_total_price_round",
      parseInt(searchParams.price_from),
      ">="
    )
  }
  if (searchParams.price_to) {
    api.addFilter(
      "field_total_price_round",
      parseInt(searchParams.price_to),
      "<="
    )
  }

  // Поиск по тексту (поиск в заголовке)
  if (searchParams.search) {
    api.addFilter("title", searchParams.search, "CONTAINS")
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

    // Подсчитываем общее количество для отображения статистики
    const totalApiParams = new DrupalJsonApiParams()
      .addFilter("status", "1")
      .addFilter("uid.id", currentUser)
      .addPageLimit(1)

    const totalResponse = await drupal.getResourceCollection<TotalCountProps>(
      "node--calculation",
      {
        params: totalApiParams.getQueryObject(),
        deserialize: false,
        next: { revalidate: 300 },
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

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-primary">
              {totalResponse.meta.count}
            </div>
            <div className="text-sm text-muted-foreground">Всего расчётов</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-green-600">
              {
                totalResponse.data.attributes.filter(
                  (n) => n.field_status === "completed"
                ).length
              }
            </div>
            <div className="text-sm text-muted-foreground">Завершенных</div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="text-2xl font-bold text-orange-600">
              {nodes.filter((n) => n.field_status === "requested").length}
            </div>
            <div className="text-sm text-muted-foreground">На рассмотрении</div>
          </div>
        </div>

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

        {/* Дополнительные действия */}
        <div className="border-t pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/calc">Новый расчёт</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Поддержка</Link>
              </Button>
            </div>

            <div className="text-center">
              <SignOut />
            </div>
          </div>
        </div>
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
