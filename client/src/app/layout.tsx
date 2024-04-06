import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getGlobalPageMetadata } from "@/loaders"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getGlobalPageMetadata()

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
