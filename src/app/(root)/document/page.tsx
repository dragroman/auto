import { Alert, AlertDescription } from "@shared/ui/alert"
import { Button } from "@shared/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui/alert-dialog"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"

export default async function Document() {
  return (
    <div>
      <div className="container py-6 mx-auto space-y-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-2">
          Перечень требуемых документов
        </h1>
        <h2 className="font-semibold text-lg mb-8">
          Для оформления договора о покупке автомобиля из Китая требуется
          предоставить документы:
        </h2>
        <ul className="space-y-6">
          <li>
            <Card>
              <CardHeader>
                <CardTitle>Скан паспорт гражданина РФ</CardTitle>
              </CardHeader>
              <CardContent>
                Сканированная копия основной страницы паспорта гражданина
                Российской Федерации с информацией о владельце.
              </CardContent>
            </Card>
          </li>
          <li>
            <Card>
              <CardHeader>
                <CardTitle>Скан страницы прописки</CardTitle>
              </CardHeader>
              <CardContent>
                Сканированная копия страницы паспорта с информацией о месте
                прописки в Российской Федерации.
              </CardContent>
            </Card>
          </li>
          <li>
            <Card>
              <CardHeader>
                <CardTitle>
                  Идентификационный номер налогоплательщика (ИНН)
                </CardTitle>
              </CardHeader>
              <CardContent>
                Укажите свой индивидуальный идентификационный номер
                налогоплательщика для оформления сделки.
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger>Смотреть образец</AlertDialogTrigger>
                  <AlertDialogContent>
                    <Image
                      src="/ИНН_образец.jpg"
                      alt="ИНН образец"
                      width={800}
                      height={600}
                    />
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </li>
          <li>
            <Card>
              <CardHeader>
                <CardTitle>
                  Страховой Номер Индивидуального Лицевого Счета (СНИЛС)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-sm">
                  Укажите свой СНИЛС для дополнительной идентификации.
                </span>
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger>Смотреть образец</AlertDialogTrigger>
                  <AlertDialogContent>
                    <Image
                      src="/Снилс_образец.jpg"
                      alt="СНИЛС образец"
                      width={800}
                      height={600}
                    />
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </li>
        </ul>
        <Alert variant="info">
          <AlertDescription>
            <p>
              Пожалуйста, убедитесь, что предоставленные сканы чёткие, полные и
              соответствуют вашим оригинальным документам.
            </p>
            <p>
              Это необходимо для успешного подписания договора купли-продажи
              автомобиля из Китая.
            </p>
            <p>
              Если у вас возникли вопросы или нужна дополнительная информация,
              не стесняйтесь обращаться за помощью.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
