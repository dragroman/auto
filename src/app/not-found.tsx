export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Главная секция с номером ошибки */}
        <div className="space-y-4">
          <div className="text-8xl md:text-9xl font-black text-primary/20 select-none">
            404
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-800">
            Страница не найдена
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            Возможно, страница была перемещена, удалена или вы ввели
            неправильный адрес
          </p>
        </div>
      </div>
    </div>
  )
}
