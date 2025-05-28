import { Badge } from "@shared/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"

interface Step {
  title: string
  content: string
  badge: {
    variant: "secondary" | "destructive"
    text: string
  }
}

const steps: Step[] = [
  {
    title: "Запрос на сайте",
    content:
      "Оставьте заявку на нашем сайте, указав необходимую модель автомобиля и контактные данные.",
    badge: {
      variant: "secondary",
      text: "0 дней",
    },
  },
  {
    title: "Залог",
    content:
      "После обработки запроса, мы запросим предоплату в размере 60 000 руб. для начала оформления заказа. После успешного перевода, цена на автомобиль фиксируется и больше не подвержена изменениям из-за колебаний валютного курса.",
    badge: {
      variant: "secondary",
      text: "0 дней",
    },
  },
  {
    title: "Заключение договора",
    content:
      "Подготовим и подпишем договор на поставку автомобиля с указанием всех условий и сроков.",
    badge: {
      variant: "secondary",
      text: "0 дней",
    },
  },
  {
    title: "Оплата 60% от стоимости",
    content:
      "Оплатите 60% от общей стоимости автомобиля в соответствии с договором.",
    badge: {
      variant: "secondary",
      text: "0 дней",
    },
  },
  {
    title: "Доставка до границы Китая - России",
    content:
      'Автомобили доставляются на стоянку "Тянью" в г. Суйфэньхэ для оформления экспорта.',
    badge: {
      variant: "destructive",
      text: "7-14 дней",
    },
  },
  {
    title: "Оплата остатка",
    content:
      "Оплатите оставшуюся часть стоимости автомобиля по российским реквизитам, согласно договору.",
    badge: {
      variant: "secondary",
      text: "0 дней",
    },
  },
  {
    title: "Получение",
    content:
      "Заберите ваш автомобиль в СВХ г. Уссурийск после прохождения всех таможенных процедур.",
    badge: {
      variant: "destructive",
      text: "7-14 дней",
    },
  },
]

export default async function HowToBuy() {
  return (
    <div>
      <div className="container max-w-5xl py-6 mx-auto space-y-4">
        <h1 className="text-4xl font-bold">Как купить</h1>
        <h2 className="text-2xl font-bold mb-10">Процесс оформления</h2>
        <div className="">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-row space-y-0 relative">
              <div className="flex flex-col items-center mr-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-400 text-lg font-bold z-10">
                  {index + 1}
                </div>
                <div
                  className={`w-1 flex-grow bg-gray-400 ${index === steps.length - 1 ? "invisible" : ""}`}
                  style={{ minHeight: "calc(100% - 2rem)" }}
                ></div>
              </div>
              <Card className="mb-4 flex-1">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>{step.title}</CardTitle>
                  <Badge variant={step.badge.variant}>{step.badge.text}</Badge>
                </CardHeader>
                <CardContent>
                  <p>{step.content}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
