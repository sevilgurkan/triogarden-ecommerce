import type { Metadata } from "next"
import type { PropsWithChildren } from "react"
import { Inter } from "next/font/google"

import { locales } from "@/i18n/config"
import { getGlobal, getGlobalPageMetadata } from "@/loaders"

import Navigation from "@/components/Layout/Navigation"
import Header from "@/components/Layout/Header"
import LocaleLayout from "@/components/LocaleLayout"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface PageParams {
  locale: string
}

interface MainLayoutProps extends PropsWithChildren {
  params: PageParams
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const meta = await getGlobalPageMetadata(params.locale)

  return {
    title: meta?.seo?.metaTitle,
    description: meta?.seo?.metaDescription,
  }
}

export default async function MainLayout({
  children,
  params,
}: MainLayoutProps) {
  const { locale } = params

  const page = await getGlobal(locale)

  console.dir(page, { depth: Infinity })

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}
