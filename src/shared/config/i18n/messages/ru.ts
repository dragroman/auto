import { Instagram } from "@shared/icons/Instagram"
import { Telegram } from "@shared/icons/Telegram"
import { Youtube } from "@shared/icons/Youtube"

export const locale = {
  header: {
    nav: {
      auction: "Аукцион",
      new: "Без пробега",
      used: "С пробегом",
      contacts: "Контакты",
      about: "О нас",
      news: "Новости",
      faq: "Вопросы и ответы",
      more: "Еще",
    },
  },
  footer: {
    copyright: `2023-${new Date().getFullYear()} © China Auto. Все права защищены`,
  },
  contact: {
    phone: "+7(914)700-88-48",
    phoneClear: "79147008848",
    email: "info@86007auto.com",
    addressChina: "КНР, г. Харбин, ул. Фушуйлу 99-5",
    addressRussia: "Россия, г. Владивосток, ул. Дальзаводская 4,оф.530",
  },
  social: {
    instagram: {
      icon: Instagram,
      title: "Instagram",
      url: "https://www.instagram.com/auto86007/",
    },
    youtube: {
      icon: Youtube,
      title: "Youtube",
      url: "https://www.youtube.com/channel/UCzA-HhJ7NYj7novx8RKX7Hw/about",
    },
    telegram: {
      icon: Telegram,
      title: "telegram",
      url: "https://t.me/auto86007",
    },
  },
  formRequest: {
    title: "Оставьте заявку",
    button: "Отправить",
    success: "Заявка успешно отправлена",
    fields: {
      price: {
        label: "Стоимость автомобиля",
        placeholder: "Например, 1 500 000 ₽",
        error: "Введите стоимость автомобиля",
        help: "Укажите примерную стоимость автомобиля",
      },
      name: {
        label: "Имя",
        placeholder: "Иван Иванов",
        error: "Введите имя",
        help: "Введите имя",
      },
      phone: {
        label: "Телефон для связи",
        placeholder: "+7 (999) 123-45-67",
        error: "Введите телефон",
        help: "Укажите номер для связи",
      },
    },
  },
}
