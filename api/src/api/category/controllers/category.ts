/**
 * category controller
 */
import { factories } from "@strapi/strapi"

export default factories.createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async findOneBySlug(ctx) {
      await this.validateQuery(ctx)

      const { slug } = ctx.params

      const entity = await strapi.db.query("api::category.category").findOne({
        where: { slug },
      })

      const sanitizedResults = await this.sanitizeOutput(entity, ctx)

      return this.transformResponse(sanitizedResults)
    },
  })
)
