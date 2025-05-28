import { getTranslations } from "next-intl/server"

export const getMenu = async () => {
  const t = await getTranslations("header.nav")
  return [
    {
      title: t("more"),
      href: "",
      footer: false,
      children: [
        {
          title: t("contacts"),
          href: "/contacts",
        },
        {
          title: t("document"),
          href: "/document",
        },
        {
          title: t("howtobuy"),
          href: "/howtobuy",
        },
      ],
    },

    // {
    //   title: t("new"),
    //   href: "/cars/new",
    // },
    // {
    //   title: t("used"),
    //   href: "/cars/used",
    // },
  ]
}
