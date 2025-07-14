// src/features/dcd-parser/ui/DcdParser.tsx
"use client"

import React, { useState } from "react"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { Card } from "@shared/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@shared/ui/alert"
import { Loader2, ExternalLink, Car, Calculator } from "lucide-react"

interface ParseResult {
  success: boolean
  calculation?: {
    id: string
    title: string
  }
  product?: {
    id: string
    title: string
  }
  message?: string
  error?: string
}

export const DcdParser: React.FC = () => {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ParseResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setResult({
        success: false,
        error: "Введите URL",
      })
      return
    }

    if (!url.includes("dcdapp.com")) {
      setResult({
        success: false,
        error: "URL должен содержать dcdapp.com",
      })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/parser/dcd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка сервера")
      }

      setResult(data)
      setUrl("") // Очищаем поле после успешного парсинга
    } catch (error) {
      console.error("Ошибка парсинга:", error)
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Произошла ошибка",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isValidUrl = url.includes("dcdapp.com") && url.includes("sku_id")

  return (
    <div className="uk-container uk-margin-large-top">
      <Card className="uk-padding">
        <h2 className="uk-heading-line uk-text-center">
          <span>Парсер автомобилей DCD</span>
        </h2>

        <div className="uk-margin-medium-top">
          <p className="uk-text-muted uk-text-center">
            Вставьте ссылку на автомобиль с сайта dcdapp.com для автоматического
            создания карточки
          </p>
        </div>

        <form onSubmit={handleSubmit} className="uk-margin-medium-top">
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="url-input">
              URL автомобиля с dcdapp.com
            </label>
            <div className="uk-position-relative">
              <Input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://m.dcdapp.com/motor/feoffline/usedcar_detail/detail.html?sku_id=..."
                className={`uk-width-1-1 ${url && !isValidUrl ? "uk-form-danger" : ""}`}
                disabled={isLoading}
              />
              {url && isValidUrl && (
                <div className="uk-position-small uk-position-center-right">
                  <ExternalLink className="uk-text-success" size={16} />
                </div>
              )}
            </div>
            {url && !isValidUrl && (
              <div className="uk-text-small uk-text-danger uk-margin-small-top">
                URL должен содержать dcdapp.com и sku_id
              </div>
            )}
          </div>

          <div className="uk-text-center">
            <Button
              type="submit"
              disabled={!isValidUrl || isLoading}
              className="uk-button-primary uk-padding-small"
              style={{ backgroundColor: "#facc00", color: "#1f2129" }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="uk-margin-small-right" size={16} />
                  Обработка...
                </>
              ) : (
                <>
                  <Car className="uk-margin-small-right" size={16} />
                  Спарсить автомобиль
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Результаты */}
        {result && (
          <div className="uk-margin-medium-top">
            {result.success ? (
              <Alert variant="info">
                <AlertTitle>
                  <Car className="uk-text-success" size={24} />
                  Успешно добавлено!
                </AlertTitle>
                <AlertDescription>
                  {result.message}

                  {result.calculation && (
                    <div className="uk-margin-small-top">
                      <div
                        className="uk-grid-small uk-flex-middle"
                        data-uk-grid
                      >
                        <div className="uk-width-auto">
                          <Calculator size={16} />
                        </div>
                        <div className="uk-width-expand">
                          <a
                            href={`/calc/view/${result.calculation.id}`}
                            className="uk-link-text uk-text-small"
                          >
                            Расчет: {result.calculation.title}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertTitle>Ошибка парсинга</AlertTitle>
                <AlertDescription>{result.error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Инструкция */}
        <div
          className="uk-margin-medium-top uk-padding-small"
          style={{ backgroundColor: "#f1f2f3", borderRadius: "4px" }}
        >
          <h4 className="uk-heading-bullet uk-margin-remove-top">
            Как использовать:
          </h4>
          <ol className="uk-list uk-list-decimal uk-text-small">
            <li>Откройте страницу автомобиля на dcdapp.com</li>
            <li>Скопируйте URL из адресной строки</li>
            <li>Вставьте ссылку в поле выше</li>
            <li>Нажмите Спарсить автомобиль</li>
            <li>Система автоматически создаст расчет и карточку товара</li>
          </ol>

          <div className="uk-margin-small-top">
            <strong>Пример ссылки:</strong>
            <code className="uk-display-block uk-text-small uk-margin-small-top">
              https://m.dcdapp.com/motor/feoffline/usedcar_detail/detail.html?sku_id=19900840&...
            </code>
          </div>
        </div>
      </Card>
    </div>
  )
}
