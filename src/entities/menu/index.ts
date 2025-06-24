import { getTranslations } from "next-intl/server"

export const getMenu = async () => {
  const t = await getTranslations("header.nav")
  return [
    {
      title: t("calc"),
      href: "/calc",
    },
    {
      title: t("callback"),
      href: "/callback",
    },
    {
      title: t("more"),
      href: "",
      footer: false,
      children: [
        {
          title: t("contacts"),
          href: "/contact",
        },
        {
          title: t("document"),
          href: "/document",
        },
        {
          title: t("howtobuy"),
          href: "/howtobuy",
        },
        {
          title: t("contract"),
          href: "/contract",
        },
      ],
    },

    // {
    //   title: t("used"),
    //   href: "/cars/used",
    // },
  ]
}
