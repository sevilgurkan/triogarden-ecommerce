import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"
import { locales } from "./config"

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (
      await (locale === "tr"
        ? // When using Turbopack, this will enable HMR for `tr`
          import("../../messages/tr.json")
        : import(`../../messages/${locale}.json`))
    ).default,
  }
})
