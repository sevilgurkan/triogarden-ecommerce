interface PageParams {
  locale: string
  slug: string
}

interface PageProps {
  params: PageParams
}

export default async function Page({ params }: PageProps) {
  return <div>Page</div>
}
