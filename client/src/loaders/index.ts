import { unstable_noStore as noStore } from "next/cache"

import { fetchData } from "@/lib/fetch-data"
import { API_PATHS } from "@/constants/api-paths"

export async function getGlobalPageMetadata() {
  const urlParamsObject = {
    populate: {
      seo: true,
    },
  }

  return await fetchData(API_PATHS.GLOBAL_PAGE, urlParamsObject)
}

export async function getPageBySlug(slug: string, lang: string) {
  noStore()

  const urlParamsObject = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      blocks: {
        populate: {
          links: true,
          imageLinks: {
            populate: {
              image: {
                fields: ["url"],
              },
            },
          },
          products: {
            populate: {
              price: true,
              brand: {
                fields: ["name"],
              },
              category: {
                fields: ["name"],
              },
              images: {
                fields: ["url", "alternativeText"],
              },
            },
          },
        },
      },
    },
  }

  return await fetchData(API_PATHS.PAGES, urlParamsObject)
}
