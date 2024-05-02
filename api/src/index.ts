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

async function getUploadedMedia(strapi: Strapi) {
  return strapi.entityService.findMany("plugin::upload.file") as Promise<
    StrapiMedia[]
  >
}

async function addSeedData(strapi: Strapi) {
  await deleteAllExistingData(strapi)

  const uploadedMedia = await getUploadedMedia(strapi)

  const brands = createBrands()
  const categories = createCategories()
  const products = createProducts(brands, categories, uploadedMedia)
  const pages = createPages(categories, uploadedMedia)

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

  for (const page of pages) {
    await strapi.entityService.create("api::page.page", {
      data: page,
    })
  }
  console.log("✅ Pages created")
}

async function deleteAllExistingData(strapi: Strapi) {
  await Promise.all([
    strapi.db.connection("brands").truncate(),
    strapi.db.connection("categories").truncate(),
    strapi.db.connection("products").truncate(),
    strapi.db.connection("pages").truncate(),
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

function createProducts(
  brands: Brand[],
  category: Category,
  media: StrapiMedia[]
): Product {
  const PRODUCTS_LENGTH = 100
  const uniqueProductNames = new Set()

  const images = media.filter(file => file.ext !== ".mp4")

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
        const randomImages = faker.helpers.arrayElements(images, 3)

        const sameDayShipping = faker.datatype.boolean({ probability: 0.4 })
        const freeCargo = faker.datatype.boolean({ probability: 0.5 })
        const isInCampaign = faker.datatype.boolean({ probability: 0.3 })
        const isRushDelivery = faker.datatype.boolean({ probability: 0.3 })
        const isDiscounted = faker.datatype.boolean({ probability: 0.7 })

        const originalPrice = parseFloat(
          faker.commerce.price({
            min: 100,
            max: 500_000,
            dec: 2,
          })
        )

        const discountPercentage = faker.helpers.arrayElement([
          10, 20, 30, 40, 50,
        ])

        const discountedPrice = isDiscounted
          ? applyDiscount(originalPrice, discountPercentage)
          : originalPrice

        const rushDeliveryDuration = isRushDelivery
          ? faker.number.int({ min: 1, max: 30 })
          : 0

        let name = faker.commerce.productName()
        while (uniqueProductNames.has(name)) {
          name = faker.commerce.productName()
        }
        uniqueProductNames.add(name)

        return {
          name,
          slug: slugify(name),
          url: `/${productPathPrefix}/${slugify(name)}`,
          locale: locale,
          price: {
            id: ++index,
            originalPrice,
            discountedPrice,
          },
          brand: {
            id: randomBrand.id,
          },
          category: {
            id: randomCategory.id,
          },
          featuredImage: randomImages[0].id,
          images: randomImages,

          sameDayShipping,
          freeCargo,
          isInCampaign,
          rushDeliveryDuration,
          publishedAt: new Date(),
        }
      }),
    }
  }, {})
}

function createPages(category: Category, media: StrapiMedia[]): Page[] {
  const images = media.filter(file => file.ext !== ".mp4")

  return [
    {
      locale: "tr",
      name: "Ana Sayfa",
      slug: "home",
      blocks: [
        {
          __component: "sections.hero-video",
          id: 1,
          title: "Ahşabın doğayla buluştuğu yer",
          media: media.find(
            file => file.name === "3768367-hd_1920_1080_25fps.mp4"
          ),
        },
        {
          __component: "sections.banners",
          bannerItems: category.tr.map(ct => ({
            title: ct.name,
            url: `/kategori/${ct.slug}`,
            image: images[Math.floor(Math.random() * images.length)],
          })),
        },
      ],
      publishedAt: new Date(),
    },
    {
      locale: "en",
      name: "Home Page",
      slug: "home",
      blocks: [
        {
          __component: "sections.hero-video",
          id: 2,
          title: "Where wood meets nature",
          media: media.find(
            file => file.name === "3768367-hd_1920_1080_25fps.mp4"
          ),
        },
        {
          __component: "sections.banners",
          bannerItems: category.en.map(ct => ({
            title: ct.name,
            url: `/category/${ct.slug}`,
            image: images[Math.floor(Math.random() * images.length)],
          })),
        },
      ],
      publishedAt: new Date(),
    },
  ]
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

function applyDiscount(originalPrice: number, discountPercentage: number) {
  return originalPrice - (originalPrice * discountPercentage) / 100
}

type StrapiMedia = {
  id: number
  name: string
  ext: string
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
    slug: string
    url: string
    locale: string
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
    sameDayShipping: boolean
    freeCargo: boolean
    isInCampaign: boolean
    rushDeliveryDuration: number
    publishedAt: Date
  }[]
}

interface Page {
  locale: string
  name: string
  slug: string
  blocks: any[]
  publishedAt: Date
}
