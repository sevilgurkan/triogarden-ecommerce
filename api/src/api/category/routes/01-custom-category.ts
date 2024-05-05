export default {
  routes: [
    {
      method: "GET",
      path: "/categories/:slug",
      handler: "api::category.category.findOneBySlug",
      config: {
        auth: false,
      },
    },
  ],
}
