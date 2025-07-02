import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { drupal } from "@shared/lib/drupal"
import { cn } from "@shared/lib/utils"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getTranslations } from "next-intl/server"
interface TotalCountProps {
  data: {
    attributes: TNodeCalculationTeaser[]
  }
  meta: {
    count: number
  }
}

const StatBlock = ({
  value,
  name,
  description,
}: {
  value: number
  name: string
  description: string
}) => {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div
        className={cn(
          "text-2xl font-bold",
          name === "total" && "text-black-600",
          name === "completed" && "text-green-600",
          name === "requested" && "text-amber-600"
        )}
      >
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  )
}

export const UserStats = async ({ currentUser }: { currentUser: string }) => {
  const t = await getTranslations("dashboard")
  // Подсчитываем общее количество для отображения статистики
  const totalApiParams = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFilter("uid.id", currentUser)
    .addFields("node--calculation", ["field_status"])
    .addPageLimit(1)

  const totalCompletedApiParams = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFilter("uid.id", currentUser)
    .addFields("node--calculation", ["field_status"])
    .addFilter("field_status", "completed")
    .addPageLimit(1)

  const totalRequestedApiParams = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFilter("uid.id", currentUser)
    .addFields("node--calculation", ["field_status"])
    .addFilter("field_status", "requested")
    .addPageLimit(1)
  const totalResponse = await drupal.getResourceCollection<TotalCountProps>(
    "node--calculation",
    {
      params: totalApiParams.getQueryObject(),
      deserialize: false,
      next: { revalidate: 300, tags: ["user_stats"] },
    }
  )

  const totalCompleted = await drupal.getResourceCollection<TotalCountProps>(
    "node--calculation",
    {
      params: totalCompletedApiParams.getQueryObject(),
      deserialize: false,
      next: { revalidate: 300, tags: ["user_stats"] },
    }
  )

  const totalRequested = await drupal.getResourceCollection<TotalCountProps>(
    "node--calculation",
    {
      params: totalRequestedApiParams.getQueryObject(),
      deserialize: false,
      next: { revalidate: 300, tags: ["user_stats"] },
    }
  )

  const stats = {
    total: totalResponse.meta.count,
    completed: totalCompleted.meta.count,
    requested: totalRequested.meta.count,
  }
  return (
    <>
      {/* Статистика */}
      <div className="grid grid-cols-3 gap-2">
        <StatBlock
          name="total"
          value={stats.total}
          description={t("user.statsAll")}
        />
        <StatBlock
          name="completed"
          value={stats.completed}
          description={t("user.statsCompleted")}
        />
        <StatBlock
          name="requested"
          value={stats.requested}
          description={t("user.statsPending")}
        />
      </div>
    </>
  )
}
