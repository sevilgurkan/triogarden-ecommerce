import { getProductsByCategory } from "@/loaders"

interface CategoryPageProps {
  params: {
    locale: string
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProductsByCategory(params.slug, params.locale)

  console.dir(products, { depth: Infinity })

  return <div>CategoryPage</div>
}
