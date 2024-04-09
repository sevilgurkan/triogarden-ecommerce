import qs from "qs"
import { flattenAttributes, getStrapiURL } from "@/utils/strapi"

const baseUrl = getStrapiURL()

export async function fetchData(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  const authToken = null
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

  const headers: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  }

  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  })

  const url = new URL(path, baseUrl)
  url.search = queryString

  try {
    const response = await fetch(url.href, authToken ? headers : {})
    const data = await response.json()

    return flattenAttributes(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}
