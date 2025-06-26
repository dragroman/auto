import { Button } from "@shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { ArrowLeft, Calculator, Search } from "lucide-react"
import Link from "next/link"

export default function CalcNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="space-y-4">
          <div className="text-6xl">🔍</div>
          <CardTitle className="text-xl">Расчет не найден</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">
            Такой расчет не существует или был удален. Возможно, ссылка устарела
            или содержит ошибку.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/calc">
                <Calculator className="w-4 h-4" />
                Сделать новый расчет
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/calc">
                <Search className="w-4 h-4" />
                Все расчеты
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                На главную
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500">
              Нужна помощь?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Свяжитесь с нами
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
