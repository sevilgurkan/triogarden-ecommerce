export default {
  async beforeCreate(event) {
    const { data } = event.params

    const price = await strapi
      .query("product.price")
      .findOne({ where: { id: data.price.id } })

    // manually handled
    if (price.discountedPrice) {
      data.discountRate = calculateDiscountRate(price)
      return
    }

    if (data.discountRate) {
      await strapi.query("product.price").update({
        where: { id: data.price.id },
        data: {
          discountedPrice: applyDiscount(
            data.discountRate,
            price.originalPrice
          ),
        },
      })
    }
  },
}

function applyDiscount(discountPercentage, originalPrice) {
  return originalPrice * (1 - discountPercentage / 100)
}

function calculateDiscountRate(price) {
  const { originalPrice, discountedPrice } = price
  return ((originalPrice - discountedPrice) / originalPrice) * 100
}
