export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337"
}

export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map(item => flattenAttributes(item))
  }

  let flattened: { [key: string]: any } = {}

  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue

    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]))
    } else {
      flattened[key] = flattenAttributes(data[key])
    }
  }

  return flattened
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null
  if (url.startsWith("data:")) return url
  if (url.startsWith("http") || url.startsWith("//")) return url
  return `${getStrapiURL()}${url}`
}
