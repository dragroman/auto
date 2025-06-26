import Image from "next/image"
import { Button } from "@shared/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { Alert, AlertDescription } from "@shared/ui/alert"
import type { Metadata } from "next"
import Link from "next/link"
import {
  Calculator,
  Search,
  FileText,
  Car,
  Truck,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  MapPin,
  Star,
  Zap,
  Link2,
} from "lucide-react"
import { cn } from "@shared/lib/utils"

export const metadata: Metadata = {
  title: "Автомобили из Китая",
  description: "Покупка и доставка автомобилей из Китая напрямую",
}

const processSteps = [
  {
    step: "01",
    title: "Выбор",
    description: "Подберём автомобиль по вашим критериям",
    time: "1 день",
    icon: Search,
    color: "bg-blue-500",
  },
  {
    step: "02",
    title: "Расчёт",
    description: "Точная калькуляция всех расходов",
    time: "30 мин",
    icon: Calculator,
    color: "bg-green-500",
  },
  {
    step: "03",
    title: "Договор",
    description: "Оформление и предоплата 60к ₽",
    time: "1 час",
    icon: FileText,
    color: "bg-orange-500",
  },
  {
    step: "04",
    title: "Доставка",
    description: "Транспортировка до Уссурийска",
    time: "7-14 дней",
    icon: Truck,
    color: "bg-purple-500",
  },
]

const platformList = [
  {
    title_ru: "Жэньжэньчэ",
    url: "https://www.renrenche.com/",
    logo: "renrenche.png",
    description: "Первая C2C площадка подержанных авто в Китае",
  },
  {
    title_ru: "Таочхэчхэ",
    url: "https://m.taocheche.com/",
    logo: "taocheche.png",
    logoBackgroundClass: "bg-blue-800",
    description: "B2C маркетплейс б/у авто с ИИ-диагностикой",
  },
  {
    title_ru: "Донгчэди",
    url: "https://www.dongchedi.com/",
    logo: "donchedi.svg",
    description:
      "Автомобильная медиаплатформа и ценами на автомобили у дилеров",
  },
  {
    title_ru: "Аутохоум",
    url: "https://www.autohome.com.cn/",
    logo: "qichezhijia.png",
    description: "Ведущая автомобильная экосистема Китая, 68М+ пользователей",
  },
  {
    title_ru: "Гуацзы",
    url: "https://www.guazi.com/",
    logo: "guazi.png",
    description: "Доминирует в онлайн-продажах б/у авто (80% рынка)",
  },
  {
    title_ru: "Che168",
    url: "https://www.che168.com/",
    logo: "2sclogo@2x.png",
    description: "B2B маркетплейс б/у авто для дилеров от Autohome",
  },
]

const features = [
  {
    icon: Shield,
    title: "Гарантия качества",
    desc: "Проверка перед отправкой",
    highlight: true,
  },
  {
    icon: DollarSign,
    title: "Прозрачная цена",
    desc: "Точный расчет стоимости автомобиля.",
    highlight: false,
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    desc: "7-14 дней до Уссурийска",
    highlight: true,
  },
  {
    icon: Zap,
    title: "Мгновенный расчет",
    desc: "Расчет в пару кликов",
    highlight: false,
  },
]

export default async function Home() {
  return (
    <div className="min-h-screen bg-background space-y-10">
      {/* Compact Hero Section */}
      <section>
        <div className="max-w-4xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Прямые поставки из Китая
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
              Автомобили из Китая
              <span className="block text-primary">от 800 000 ₽</span>
            </h1>
          </div>

          {/* Primary CTA */}
          <div className="space-y-3">
            <Button
              asChild
              size="lg"
              className="w-full h-12 text-base font-semibold"
            >
              <Link href="/calc">
                <Calculator className="mr-2 h-5 w-5" />
                Рассчитать стоимость
              </Link>
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild className="h-10">
                <Link href="/callback">
                  <Phone className="h-4 w-4" />
                  Обратный звонок
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-10">
                <Link href="/contact">
                  <MapPin className="h-4 w-4" />
                  Контакты
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-center mb-4">
            Наши преимущества
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-4 ${feature.highlight ? "border-primary bg-primary/5" : ""}`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${feature.highlight ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  >
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Grid */}
      <section>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Площадки для поиска</h2>
            <Badge variant="outline" className="text-xs">
              Китай
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {platformList.map((platform, index) => (
              <Card key={index} className="">
                <CardHeader>
                  {platform.logo && (
                    <div
                      className={cn(
                        `${platform.logoBackgroundClass}`,
                        platform.logoBackgroundClass ? "w-fit px-8" : "w-full",
                        "h-8 relative "
                      )}
                    >
                      <Image
                        src={`/platforms/${platform.logo}`}
                        alt={platform.title_ru}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  )}
                  <CardTitle>{platform.title_ru}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {platform.description}
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link target="_blank" href={platform.url}>
                      <Link2 />
                      Перейти
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Compact Process Timeline */}
      <section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            Как это работает
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-3 h-full">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-primary rounded-full flex items-center justify-center">
                      <step.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="text-xs font-bold text-primary mb-1">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <Badge variant="secondary" className="text-xs py-0">
                      {step.time}
                    </Badge>
                  </div>
                </Card>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <div className="max-w-4xl mx-auto">
          <Alert className="border-primary/20 bg-primary/5">
            <CheckCircle className="h-5 w-5 text-primary" />
            <AlertDescription>
              <div className="flex items-center justify-between w-full gap-2">
                <div>
                  <div className="font-semibold mb-1">Готовы к покупке?</div>
                  <div className="text-sm text-muted-foreground">
                    Бесплатная консультация и расчёт
                  </div>
                </div>
                <div>
                  <Button asChild>
                    <Link href="/callback">
                      Начать
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Footer Info */}
      <section>
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold">Офис в России</div>
              <div className="text-muted-foreground">Владивосток</div>
            </div>
            <div>
              <div className="font-semibold">Офис в Китае</div>
              <div className="text-muted-foreground">Харбин</div>
            </div>
            <div>
              <div className="font-semibold">Телефон</div>
              <div className="text-muted-foreground">+7(914)700-88-48</div>
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-muted-foreground">info@86007auto.com</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
