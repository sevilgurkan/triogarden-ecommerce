import type { PropsWithChildren } from "react"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, useMessages } from "next-intl"

interface LocaleLayoutProps extends PropsWithChildren {
  locale: string
}

export default function LocaleLayout({ children, locale }: LocaleLayoutProps) {
  const messages = useMessages()

  if (!messages) {
    return notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
