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
  pageNew: {
    title: "Без пробега",
    subtitle: "Купить новый автомобиль в Китае",
  },
  carTeaser: {
    noPhoto: "Нет фото",
    noTitle: "Нет названия",
    noDescription: "Нет описания",
    noPrice: "Цена не указана",
    noYear: "Год не указан",
    noKm: "Пробег не указан",
    noEngine: "Двигатель не указан",
    noTransmission: "Коробка передач не указана",
  },
  form: {
    error: "error",
    submitting: "Расчет...",
    submit: "Рассчитать",
    reset: "Сбросить",

    vehicle: {
      condition: {
        label: "Состояние автомобиля",
        new: {
          title: "Без пробега",
          description: "Новый автомобиль",
        },
        used: {
          title: "С пробегом",
          description: "Подержанный автомобиль",
        },
      },
      production_date: {
        label: "Дата производства",
        specify_date: "Уточнить дату производства",
        month_placeholder: "Выберите месяц",
        year_placeholder: "Выберите год",
        under3: "До 3 лет",
        from3to5: "От 3 до 5 лет",
        from5to7: "От 5 до 7 лет",
        use_range: "Указать диапазон дат",
        months: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
      },
    },
    engine: {
      label: "Тип двигателя",
      gas: {
        title: "Бензиновый",
        description: "Классический двигатель внутреннего сгорания",
      },
      hybrid: {
        title: "Гибридный",
        description: "Комбинация ДВС и электрического мотора",
      },
      electric: {
        title: "Электрический",
        description: "Полностью электрический двигатель",
      },
      capacity: "Объем двигателя (мл)",
      power: "Мощность (л.с.)",
    },
    price: {
      actual: "Цена автомобиля (RMB)",
      retail: "Розничная цена (RMB)",
      profit: "Комиссия",
      shipping: "Стоимость доставки (RMB)",
      additional: "Дополнительные расходы (RMB)",
    },
  },
}
