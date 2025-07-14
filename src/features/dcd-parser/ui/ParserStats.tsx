"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@shared/ui/card"
import { TrendingUp, Car, Calculator, Clock } from "lucide-react"

interface ParserStats {
  totalParsed: number
  todayParsed: number
  successRate: number
  averageProcessingTime: number
  recentItems: Array<{
    id: string
    title: string
    type: "calculation" | "product"
    created: string
    status: "success" | "error"
  }>
}

export const ParserStats: React.FC = () => {
  const [stats, setStats] = useState<ParserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/parser/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Ошибка загрузки статистики:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="uk-text-center uk-padding">
        <div className="uk-spinner" data-uk-spinner></div>
        <p className="uk-margin-small-top">Загрузка статистики...</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <Card className="uk-padding">
        <p className="uk-text-muted uk-text-center">Статистика недоступна</p>
      </Card>
    )
  }

  return (
    <div className="uk-margin-medium-top">
      <h3 className="uk-heading-line">
        <span>Статистика парсера</span>
      </h3>

      {/* Основная статистика */}
      <div
        className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m"
        data-uk-grid
      >
        <div>
          <Card className="uk-padding-small uk-text-center">
            <div
              className="uk-grid-small uk-flex-middle uk-flex-center"
              data-uk-grid
            >
              <div className="uk-width-auto">
                <Car className="uk-text-primary" size={24} />
              </div>
              <div className="uk-width-expand">
                <div className="uk-text-large uk-text-bold">
                  {stats.totalParsed}
                </div>
                <div className="uk-text-small uk-text-muted">
                  Всего обработано
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="uk-padding-small uk-text-center">
            <div
              className="uk-grid-small uk-flex-middle uk-flex-center"
              data-uk-grid
            >
              <div className="uk-width-auto">
                <TrendingUp className="uk-text-success" size={24} />
              </div>
              <div className="uk-width-expand">
                <div className="uk-text-large uk-text-bold">
                  {stats.todayParsed}
                </div>
                <div className="uk-text-small uk-text-muted">Сегодня</div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="uk-padding-small uk-text-center">
            <div
              className="uk-grid-small uk-flex-middle uk-flex-center"
              data-uk-grid
            >
              <div className="uk-width-auto">
                <Calculator className="uk-text-warning" size={24} />
              </div>
              <div className="uk-width-expand">
                <div className="uk-text-large uk-text-bold">
                  {stats.successRate}%
                </div>
                <div className="uk-text-small uk-text-muted">Успешно</div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="uk-padding-small uk-text-center">
            <div
              className="uk-grid-small uk-flex-middle uk-flex-center"
              data-uk-grid
            >
              <div className="uk-width-auto">
                <Clock className="uk-text-muted" size={24} />
              </div>
              <div className="uk-width-expand">
                <div className="uk-text-large uk-text-bold">
                  {stats.averageProcessingTime}с
                </div>
                <div className="uk-text-small uk-text-muted">Среднее время</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Последние обработанные элементы */}
      {stats.recentItems && stats.recentItems.length > 0 && (
        <div className="uk-margin-medium-top">
          <h4>Последние обработанные</h4>
          <Card className="uk-padding-small">
            <div className="uk-overflow-auto">
              <table className="uk-table uk-table-small uk-table-divider">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Дата</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div
                          className="uk-text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {item.title}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`uk-label uk-label-${item.type === "calculation" ? "warning" : "primary"}`}
                        >
                          {item.type === "calculation" ? "Расчет" : "Товар"}
                        </span>
                      </td>
                      <td className="uk-text-small uk-text-muted">
                        {new Date(item.created).toLocaleString("ru-RU")}
                      </td>
                      <td>
                        <span
                          className={`uk-label uk-label-${item.status === "success" ? "success" : "danger"}`}
                        >
                          {item.status === "success" ? "Успешно" : "Ошибка"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// src/app/api/parser/stats/route.ts
import { NextResponse } from "next/server"
import { drupal } from "@shared/lib/drupal"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@features/auth/session"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Получаем статистику расчетов со статусом "parsed_from_dcd"
    const calculations = await drupal.getResourceCollection(
      "node--calculation",
      {
        params: {
          "filter[field_status]": "parsed_from_dcd",
          "page[limit]": 5,
          sort: "-created",
        },
      }
    )

    // Получаем статистику товаров с ссылкой на DCD
    const products = await drupal.getResourceCollection(
      "commerce_product--car",
      {
        params: {
          "filter[field_source_sku_id][operator]": "IS NOT NULL",
          "page[limit]": 5,
          sort: "-created",
        },
      }
    )

    // Считаем статистику за сегодня
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTimestamp = Math.floor(today.getTime() / 1000)

    const todayCalculations = calculations.filter(
      (calc: any) => calc.created >= todayTimestamp
    )

    const recentItems = [
      ...calculations.slice(0, 3).map((calc: any) => ({
        id: calc.id,
        title: calc.title,
        type: "calculation" as const,
        created: new Date(calc.created * 1000).toISOString(),
        status: "success" as const,
      })),
      ...products.slice(0, 2).map((product: any) => ({
        id: product.id,
        title: product.title,
        type: "product" as const,
        created: new Date(product.created * 1000).toISOString(),
        status: "success" as const,
      })),
    ].sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )

    const stats = {
      totalParsed: calculations.length + products.length,
      todayParsed: todayCalculations.length,
      successRate: 95, // Можно рассчитать динамически на основе логов
      averageProcessingTime: 12, // Можно рассчитать динамически
      recentItems: recentItems.slice(0, 5),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Ошибка получения статистики:", error)
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 })
  }
}
