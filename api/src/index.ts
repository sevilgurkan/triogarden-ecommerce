import { Strapi } from "@strapi/strapi"
import { fakerTR, fakerEN } from "@faker-js/faker"

const REFRESH_DATA = false

export default {
  async register({ strapi }: { strapi: Strapi }) {},
  async bootstrap({ strapi }: { strapi: Strapi }) {
    if (REFRESH_DATA) {
      console.log("\n🔄 Refreshing data...")
      await addSeedData(strapi)
    }
  },
}

const PRIMARY_BRAND = "Triogarden"

const localeConfig = {
  tr: {
    faker: fakerTR,
    productPathPrefix: "urun",
  },
  en: {
    faker: fakerEN,
    productPathPrefix: "product",
  },
}

async function addSeedData(strapi: Strapi) {
  await deleteAllExistingData(strapi)

  const brands = createBrands()
  const categories = createCategories()
  const products = createProducts(brands, categories)

  await Promise.all([
    ...brands.map(brand =>
      strapi.entityService.create("api::brand.brand", {
        data: brand,
      })
    ),
    ...Object.values(categories)
      .flat()
      .map(category =>
        strapi.entityService.create("api::category.category", {
          data: category,
        })
      ),
  ])

  console.log("✅ Brands & Categories created")

  for (const product of Object.values(products).flat()) {
    await strapi.entityService.create("api::product.product", {
      data: product,
    })
  }
  console.log("✅ Products created")
}

async function deleteAllExistingData(strapi: Strapi) {
  await Promise.all([
    strapi.db.connection("brands").truncate(),
    strapi.db.connection("categories").truncate(),
    strapi.db.connection("products").truncate(),
  ])

  console.log("✅ Deleted all existing data")
}

function createBrands(): Brand[] {
  const brands = [PRIMARY_BRAND, "Awazon"]

  return brands.map((brand, index) => ({
    id: ++index,
    name: brand,
    slug: slugify(brand),
    publishedAt: new Date(),
  }))
}

function createCategories(): Category {
  const categories = {
    tr: [
      "Oturma Grupları",
      "Köşe Takımları",
      "Sandalyeler",
      "Sehpalar",
      "Masa Takımları",
      "Masalar",
      "Salıncak & Daybed",
      "Şezlong",
      "Şemsiyeler",
      "Servis Arabaları",
      "Aydınlatmalar",
      "Şömineler",
    ],
    en: [
      "Seating Groups",
      "Corner Sets",
      "Chairs",
      "Coffee Tables",
      "Dining Sets",
      "Tables",
      "Swing & Daybed",
      "Sun Loungers",
      "Umbrellas",
      "Serving Carts",
      "Lighting",
      "Fireplaces",
    ],
  }

  let id = 0
  return Object.entries(categories).reduce((res, [locale, names]) => {
    return {
      ...res,
      [locale]: names.map(name => ({
        id: ++id,
        name,
        slug: slugify(name),
        locale,
        publishedAt: new Date(),
      })),
    }
  }, {})
}

function createProducts(brands: Brand[], category: Category): Product {
  const PRODUCTS_LENGTH = 20

  return Object.entries(localeConfig).reduce((res, [locale, config]) => {
    const { faker, productPathPrefix } = config

    const localeCategories = category[locale]

    return {
      ...res,
      [locale]: Array.from({ length: PRODUCTS_LENGTH }, (_, index) => {
        const isPrimaryBrand = faker.datatype.boolean({ probability: 0.7 })

        const randomBrand = isPrimaryBrand
          ? brands.find(brand => brand.name === PRIMARY_BRAND)
          : faker.helpers.arrayElement(
              brands.filter(brand => brand.name !== PRIMARY_BRAND)
            )

        const randomCategory = faker.helpers.arrayElement(localeCategories)

        const sameDayShipping = faker.datatype.boolean({ probability: 0.4 })
        const freeCargo = faker.datatype.boolean({ probability: 0.5 })
        const isInCampaign = faker.datatype.boolean({ probability: 0.3 })

        const name = faker.commerce.productName()

        return {
          name,
          price: {
            id: ++index,
            originalPrice: 0,
            discountedPrice: 0,
          },
          brand: {
            id: randomBrand.id,
          },
          category: {
            id: randomCategory.id,
          },
          featuredImage: null,
          images: null,
          url: `/${productPathPrefix}/${slugify(name)}`,
          locale: locale,
          sameDayShipping,
          freeCargo,
          isInCampaign,
          publishedAt: new Date(),
        }
      }),
    }
  }, {})
}

function slugify(str: string) {
  const trMap = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  }

  for (let key in trMap) {
    str = str.replace(new RegExp("[" + key + "]", "g"), trMap[key])
  }

  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

type Brand = {
  id: number
  name: string
  slug: string
  publishedAt: Date
}

type Category = {
  [key: string]: {
    id: number
    name: string
    slug: string
    locale: string
    publishedAt: Date
  }[]
}

type Product = {
  [key: string]: {
    name: string
    price: {
      id: number
      originalPrice: number
      discountedPrice: number
    }
    brand: {
      id: number
    }
    category: {
      id: number
    }
    featuredImage: null
    images: null
    url: string
    locale: string
    sameDayShipping: boolean
    freeCargo: boolean
    isInCampaign: boolean
    publishedAt: Date
  }[]
}
