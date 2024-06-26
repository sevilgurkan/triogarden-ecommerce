import { Pathnames } from "next-intl/navigation"

export const locales = ["tr", "en"] as const
export const defaultLocale = "tr"

export const pathnames = {
  "/category/[slug]": {
    tr: "/kategori/[slug]",
    en: "/category/[slug]",
  },
  "/product/[slug]": {
    tr: "/urun/[slug]",
    en: "/product/[slug]",
  },
} satisfies Pathnames<typeof locales>

export const localePrefix = "as-needed"

export type AppPathnames = keyof typeof pathnames
