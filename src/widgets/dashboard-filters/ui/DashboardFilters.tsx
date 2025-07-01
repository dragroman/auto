// src/widgets/dashboard-filters/ui/DashboardFilters.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { Label } from "@shared/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { FilterIcon, XIcon, SearchIcon } from "lucide-react"

interface FilterState {
  status: string
  engineType: string
  priceFrom: string
  priceTo: string
  search: string
}

const statusOptions = [
  { value: "all", label: "Все статусы" },
  { value: "draft", label: "Черновик" },
  { value: "requested", label: "На рассмотрении" },
  { value: "completed", label: "Завершен" },
]

const engineTypeOptions = [
  { value: "all", label: "Все типы" },
  { value: "gas", label: "Бензин" },
  { value: "hybrid", label: "Гибрид" },
  { value: "electric", label: "Электро" },
]

export const DashboardFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Инициализация состояния из URL параметров
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    engineType: "all",
    priceFrom: "",
    priceTo: "",
    search: "",
  })

  const [showFilters, setShowFilters] = useState(false)

  // Эффект для инициализации фильтров из URL
  useEffect(() => {
    setFilters({
      status: searchParams.get("status") || "all",
      engineType: searchParams.get("engine_type") || "all",
      priceFrom: searchParams.get("price_from") || "",
      priceTo: searchParams.get("price_to") || "",
      search: searchParams.get("search") || "",
    })
  }, [searchParams])

  // Подсчет активных фильтров
  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.status !== "all") count++
    if (filters.engineType !== "all") count++
    if (filters.priceFrom || filters.priceTo) count++
    if (filters.search) count++
    return count
  }

  // Применение фильтров
  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.status !== "all") params.set("status", filters.status)
    if (filters.engineType !== "all")
      params.set("engine_type", filters.engineType)
    if (filters.priceFrom) params.set("price_from", filters.priceFrom)
    if (filters.priceTo) params.set("price_to", filters.priceTo)
    if (filters.search) params.set("search", filters.search)

    router.push(`${pathname}?${params.toString()}`)
  }

  // Сброс фильтров
  const resetFilters = () => {
    setFilters({
      status: "all",
      engineType: "all",
      priceFrom: "",
      priceTo: "",
      search: "",
    })
    router.push(pathname)
  }

  // Обновление отдельного фильтра
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Фильтры
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Скрыть" : "Показать"}
          </Button>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent className="space-y-4">
          {/* Поиск */}
          <div className="space-y-2">
            <Label htmlFor="search">Поиск по расчётам</Label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Поиск по модели, году..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Статус и тип двигателя */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Статус расчёта</Label>
              <Select
                value={filters.status}
                onValueChange={(value) => updateFilter("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Тип двигателя</Label>
              <Select
                value={filters.engineType}
                onValueChange={(value) => updateFilter("engineType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  {engineTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Диапазон цен */}
          <div className="space-y-2">
            <Label>Диапазон цен (₽)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="От"
                type="number"
                value={filters.priceFrom}
                onChange={(e) => updateFilter("priceFrom", e.target.value)}
              />
              <Input
                placeholder="До"
                type="number"
                value={filters.priceTo}
                onChange={(e) => updateFilter("priceTo", e.target.value)}
              />
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-2 pt-4">
            <Button onClick={applyFilters} className="flex-1">
              Применить фильтры
            </Button>
            <Button
              variant="outline"
              onClick={resetFilters}
              disabled={activeFiltersCount === 0}
            >
              <XIcon className="h-4 w-4 mr-2" />
              Сбросить
            </Button>
          </div>

          {/* Активные фильтры */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {filters.status !== "all" && (
                <Badge variant="secondary">
                  Статус:{" "}
                  {statusOptions.find((o) => o.value === filters.status)?.label}
                </Badge>
              )}
              {filters.engineType !== "all" && (
                <Badge variant="secondary">
                  Двигатель:{" "}
                  {
                    engineTypeOptions.find(
                      (o) => o.value === filters.engineType
                    )?.label
                  }
                </Badge>
              )}
              {(filters.priceFrom || filters.priceTo) && (
                <Badge variant="secondary">
                  Цена: {filters.priceFrom || "0"} - {filters.priceTo || "∞"} ₽
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary">Поиск: {filters.search}</Badge>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
