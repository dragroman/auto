import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { drupal } from "@shared/lib/drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"

interface TotalCountProps {
  data: {
    attributes: TNodeCalculationTeaser[]
  }
  meta: {
    count: number
  }
}

export const UserStats = async ({ currentUser }: { currentUser: string }) => {
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
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Всего расчётов</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {stats.completed}
          </div>
          <div className="text-sm text-muted-foreground">Завершенных</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="text-2xl font-bold text-orange-600">
            {stats.requested}
          </div>
          <div className="text-sm text-muted-foreground">На рассмотрении</div>
        </div>
      </div>
    </>
  )
}
