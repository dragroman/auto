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
import { getTranslations } from "next-intl/server"

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
    const t = await getTranslations("dashboard")
    return (
      <div className="space-y-4">
        <PageTitle title={t("profile.title")} />
        <div className="text-center py-8">
          <p className="mb-4">{t("signIn.helpText")}</p>
          <Button asChild>
            <Link href="/signin">{t("signIn.entrance")}</Link>
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
    const t = await getTranslations("dashboard")
    return (
      <div className="space-y-6">
        <PageTitle title={t("profile.title")} />

        {/* Информация о пользователе */}
        <User user={session.user} />

        <UserStats currentUser={currentUser} />

        {/* Фильтры */}
        <DashboardFilters />

        {/* Результаты с фильтрацией */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {hasFilters
                ? t("profile.resultsTitle")
                : t("profile.myCalculations")}
            </h2>
            <div className="text-sm text-muted-foreground"></div>
          </div>

          {nodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">
                {hasFilters
                  ? t("profile.nothingFound")
                  : t("profile.noCalculations")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {hasFilters
                  ? t("profile.tryChangeParams")
                  : t("profile.createFirstCalculation")}
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <Link href="/calc">{t("profile.calculate")}</Link>
                </Button>
                {hasFilters && (
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">{t("profile.resetFilters")}</Link>
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
    const t = await getTranslations("dashboard")
    return (
      <div className="space-y-4">
        <PageTitle title={t("profile.title")} />
        <User user={session.user} />

        <div className="text-center py-12">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium mb-2">{t("profile.error")}</h3>
          <p className="text-muted-foreground mb-4">
            {t("profile.errorDescription")}
          </p>
          <Button onClick={() => window.location.reload()}>
            {t("profile.tryAgain")}
          </Button>
        </div>
      </div>
    )
  }
}
