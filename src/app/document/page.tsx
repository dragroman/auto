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
          <li className="rounded-xl shadow p-6 flex flex-col gap-2 border">
            <span className="font-semibold">Скан паспорт гражданина РФ</span>
            <span className="text-gray-600 text-sm">
              Сканированная копия основной страницы паспорта гражданина
              Российской Федерации с информацией о владельце.
            </span>
          </li>
          <li className="rounded-xl shadow p-6 flex flex-col gap-2 border">
            <span className="font-semibold">Скан страницы прописки</span>
            <span className="text-sm">
              Сканированная копия страницы паспорта с информацией о месте
              прописки в Российской Федерации.
            </span>
          </li>
          <li className="rounded-xl shadow p-6 flex flex-col gap-2 border">
            <span className="font-semibold">
              Идентификационный номер налогоплательщика (ИНН)
            </span>
            <span className="text-sm">
              Укажите свой индивидуальный идентификационный номер
              налогоплательщика для оформления сделки.
            </span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span className="text-blue-600 underline cursor-pointer">
                  Смотреть образец
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <img
                  src="ИНН_образец.jpg"
                  alt="ИНН образец"
                  className="max-w-full h-auto rounded shadow"
                />
              </AlertDialogContent>
            </AlertDialog>
          </li>
          <li className="rounded-xl shadow p-6 flex flex-col gap-2 border">
            <span className="font-semibold">
              Страховой Номер Индивидуального Лицевого Счета (СНИЛС)
            </span>
            <span className="text-sm">
              Укажите свой СНИЛС для дополнительной идентификации.
            </span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span className="text-blue-600 underline cursor-pointer">
                  Смотреть образец
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <img
                  src="Снилс_образец.jpg"
                  alt="СНИЛС образец"
                  className="max-w-full h-auto rounded shadow"
                />
              </AlertDialogContent>
            </AlertDialog>
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
