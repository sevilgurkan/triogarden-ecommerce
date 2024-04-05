import qs from "qs"
import { getStrapiURL } from "./strapi"

const baseUrl = getStrapiURL()

export async function fetchData(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  const authToken = null

  const headers: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
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
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}
