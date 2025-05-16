import { FormRequest } from "@features/form-request"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card"

export const HomeHero = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="font-black text-4xl">Выкуп автомобиля из Китая</h1>
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <FormRequest />
      </CardContent>
      <CardFooter>
        <p>Описание</p>
      </CardFooter>
    </Card>
  )
}
