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
