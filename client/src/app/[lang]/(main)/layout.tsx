import type { Metadata } from "next"
import type { PropsWithChildren } from "react"
import { Inter } from "next/font/google"
import { getGlobalPageMetadata } from "@/loaders"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface PageParams {
  params: {
    lang: string
  }
}

interface MainLayoutProps extends PropsWithChildren {
  params: PageParams
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const meta = await getGlobalPageMetadata(params.lang)

  return {
    title: meta.seo.metaTitle,
    description: meta.seo.metaDescription,
  }
}

export default function MainLayout({ children, params }: MainLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
