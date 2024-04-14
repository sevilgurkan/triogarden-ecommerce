import { getTranslations } from "next-intl/server"

interface MainPageProps {
  params: {
    locale: string
  }
}

export default async function MainPage({ params }: MainPageProps) {
  const t = await getTranslations("Index")

  return (
    <div>
      <h1>MainPage</h1>
      <p>{t("title")}</p>
    </div>
  )
}
