import { Pathnames } from "next-intl/navigation"

export const locales = ["tr", "en"] as const
export const defaultLocale = "tr"

export const pathnames = {} satisfies Pathnames<typeof locales>

export const localePrefix = "as-needed"

export type AppPathnames = keyof typeof pathnames
