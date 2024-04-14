import createMiddleware from "next-intl/middleware"
import { locales, localePrefix } from "./i18n/config"

export default createMiddleware({
  locales,
  defaultLocale: "tr",
  localeDetection: false,
  localePrefix,
})

export const config = {
  matcher: ["/((?!_next).*)", "/", "/(tr|en)/:path*"],
}
