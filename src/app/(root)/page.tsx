import { Button, buttonVariants } from "@shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Автомобили из Китая",
  description: "...",
}

const platformList = [
  {
    title: "人人车",
    title_ru: "Жэньжэньчэ",
    url: "https://www.renrenche.com/",
    description: "Популярный сервис для покупки б/у автомобилей.",
    tags: "с пробегом",
  },
  {
    title: "Taocheche",
    title_ru: "Таочхэчхэ",
    url: "https://m.taocheche.com/",
    description: "Платформа с проверенными автомобилями, есть аукционы.",
    tags: "с пробегом",
  },
  {
    title: "懂车帝",
    title_ru: "Донгчэди",
    url: "https://www.dongchedi.com/",
    description: "Агрегатор новых и подержанных авто с ценами от дилеров.",
    tags: "новые, с пробегом",
  },
  {
    title: "Autohome",
    title_ru: "Аутохоум",
    url: "https://www.autohome.com.cn/",
    description:
      "Крупнейший автомобильный портал с каталогами новых машин и дилерами.",
    tags: "новые",
  },
  {
    title: "Yiche",
    title_ru: "Ичхэ",
    url: "https://yiche.com/",
    description: "Автомобильный портал с каталогами новых машин и дилерами.",
    tags: "новые",
  },
  {
    title: "瓜子二手车",
    title_ru: "Гуацзы",
    url: "https://www.guazi.com/",
    description:
      "Одна из крупнейших площадок подержанных авто с проверкой истории.",
    tags: "с пробегом",
  },
  {
    title: "优信二手车",
    title_ru: "Юсинь",
    url: "https://www.xin.com/",
    description: "Платформа с проверенными автомобилями, есть аукционы.",
    tags: "с пробегом",
  },
  {
    title: "58同城",
    title_ru: "58 Тунчэн",
    url: "https://www.58.com/",
    description: "Аналог Avito в Китае, много частных объявлений.",
    tags: "новые, с пробегом",
  },
]

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto py-8 md:py-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-gray-900 mb-6">
            Покупка автомобилей
            <span className="block text-primary">из Китая напрямую</span>
          </h1>
          <p className="text-md md:text-xl text-gray-600 max-w-3xl mx-auto">
            Хотите купить автомобиль из Китая напрямую? Мы даём вам такую
            возможность. Полный сервис от поиска до доставки в г. Уссурийск.
          </p>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col gap-8 mb-16">
          {/* Шаг 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">
                  Поиск автомобиля
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Найдите подходящий автомобиль на популярных площадках в Китае
                или отправьте запрос с характеристиками нашим менеджерам указав
                модель и год
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Популярные площадки:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {platformList.map((item) => (
                    <Button variant="outline" key={item.url} asChild>
                      <Link target="_blank" href={item.url}>
                        {item.title_ru}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">
                  Расчёт стоимости
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Воспользуйтесь нашим калькулятором для полного расчёта стоимости
                с доставкой до г. Уссурийск
              </p>
              <div className="bg-gradient-to-r from-amber-500 to-yellow-200 rounded-xl p-6 text-black text-center">
                <div className="text-3xl font-bold mb-2">🧮</div>
                <h4 className="font-semibold mb-2">Калькулятор стоимости</h4>
                <p className="text-sm opacity-90 mb-4">
                  Узнайте точную стоимость с учётом всех расходов
                </p>
                <Button variant="white" asChild>
                  <Link href="/calc">Рассчитать →</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">
                  Оформление
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Если требуются наши услуги по доставке автомобиля, нажмите
                кнопку «Запрос». Дальше поработает наш менеджер.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Отправить запрос
                </button>
                <p className="text-sm text-gray-500 text-center">
                  После этого менеджер свяжется с вами для уточнения данных
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы начать?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Получите персональную консультацию и узнайте, как мы можем помочь
            вам купить автомобиль из Китая
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="white"
              className="text-muted-foreground"
              asChild
            >
              <Link href="/">Консультация</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Связаться с нами</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🚗</div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Прямые поставки
            </h4>
            <p className="text-gray-600 text-sm">
              Работаем напрямую с производителями в Китае
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="font-semibold text-gray-900 mb-2">Лучшие цены</h4>
            <p className="text-gray-600 text-sm">Без переплат посредникам</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🚚</div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Полная логистика
            </h4>
            <p className="text-gray-600 text-sm">
              Из любой точки Китая до г. Уссурийска
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📋</div>
            <h4 className="font-semibold text-gray-900 mb-2">Все документы</h4>
            <p className="text-gray-600 text-sm">
              Помощь в оформлении и растаможке
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
