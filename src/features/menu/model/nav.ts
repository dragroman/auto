import { locale } from "@shared/config/i18n/messages/ru"

const t = locale

export const nav = [
  {
    title: t.header.nav.more,
    href: "",
    footer: false,
    children: [
      {
        title: t.header.nav.contacts,
        href: "/contacts",
      },
      {
        title: t.header.nav.about,
        href: "/about",
      },
      {
        title: t.header.nav.news,
        href: "/news",
      },
      {
        title: t.header.nav.auction,
        href: "/auction",
      },
    ],
  },

  {
    title: t.header.nav.new,
    href: "/new",
  },
  {
    title: t.header.nav.used,
    href: "/used",
  },
]
