import { buttonVariants } from "@shared/ui/button"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Автомобили из Китая",
  description: "...",
}

const PlatformList = [
  {
    title: "懂车帝",
  },
]

export default async function Home() {
  return (
    <>
      <p>
        Хотите купить автомобиль из Китая напрямую? Мы дае вам такую
        возможность.
      </p>
      <p>Шаг 1</p>
      <p>Найдите подходящий автомобиль на площадках в Китае</p>
      <p>...перечисление площадок...</p>
      <p>Шаг 2</p>
      <p>
        Воспользуйтесь нашим калькулятором для полного расчета стоимости с
        доставкой до г. Уссурийск
      </p>
      <Link className={buttonVariants({ variant: "outline" })} href="/calc">
        calculator
      </Link>
      <p>Шаг 3</p>
      <p>Нажмите запрос</p>
      <p>Дальше поработает наш менеджер</p>
      <p>После отправки всех</p>
    </>
  )
}
