import type { Schema, Attribute } from "@strapi/strapi"

export interface ButtonsButton extends Schema.Component {
  collectionName: "components_buttons_buttons"
  info: {
    displayName: "Button"
  }
  attributes: {
    text: Attribute.String & Attribute.Required
    variant: Attribute.Enumeration<
      ["primary", "secondary", "destructive", "ghost"]
    > &
      Attribute.DefaultTo<"primary">
  }
}

export interface ButtonsIconButton extends Schema.Component {
  collectionName: "components_buttons_icon_buttons"
  info: {
    displayName: "Icon Button"
  }
  attributes: {
    text: Attribute.String & Attribute.Required
    variant: Attribute.Enumeration<
      ["primary", "secondary", "destructive", "ghost"]
    > &
      Attribute.DefaultTo<"primary">
    icon: Attribute.Enumeration<["USER", "FAVOURITE", "BASKET"]> &
      Attribute.Required
  }
}

export interface LayoutHeader extends Schema.Component {
  collectionName: "components_layout_headers"
  info: {
    displayName: "Header"
    description: ""
  }
  attributes: {
    brandName: Attribute.String
    links: Attribute.Component<"links.button-link", true>
  }
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: "components_layout_navbars"
  info: {
    displayName: "Navbar"
  }
  attributes: {
    links: Attribute.Component<"links.link", true>
  }
}

export interface LinksButtonLink extends Schema.Component {
  collectionName: "components_links_button_links"
  info: {
    displayName: "Button Link"
    description: ""
  }
  attributes: {
    text: Attribute.String & Attribute.Required
    url: Attribute.String & Attribute.Required
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>
    variant: Attribute.Enumeration<
      ["primary", "secondary", "destructive", "ghost"]
    > &
      Attribute.DefaultTo<"primary">
    icon: Attribute.Enumeration<["USER", "FAVOURITE", "BASKET"]>
  }
}

export interface LinksImageLink extends Schema.Component {
  collectionName: "components_links_image_links"
  info: {
    displayName: "Image Link"
  }
  attributes: {
    text: Attribute.String
    url: Attribute.String & Attribute.Required
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>
    image: Attribute.Media & Attribute.Required
  }
}

export interface LinksLink extends Schema.Component {
  collectionName: "components_links_links"
  info: {
    displayName: "Link"
  }
  attributes: {
    text: Attribute.String & Attribute.Required
    url: Attribute.String & Attribute.Required
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>
  }
}

export interface LinksSocialLink extends Schema.Component {
  collectionName: "components_links_social_links"
  info: {
    displayName: "Social Link"
  }
  attributes: {
    text: Attribute.String
    url: Attribute.String & Attribute.Required
    isExternal: Attribute.Boolean & Attribute.DefaultTo<true>
    social: Attribute.Enumeration<
      ["YOUTUBE", "TWITTER", "INSTAGRAM", "PINTEREST"]
    >
  }
}

export interface ProductPrice extends Schema.Component {
  collectionName: "components_product_prices"
  info: {
    displayName: "Price"
  }
  attributes: {
    originalPrice: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0
        },
        number
      >
    discountedPrice: Attribute.Decimal &
      Attribute.SetMinMax<
        {
          min: 0
        },
        number
      >
  }
}

export interface SectionsHero extends Schema.Component {
  collectionName: "components_sections_heroes"
  info: {
    displayName: "Hero"
  }
  attributes: {
    imageLinks: Attribute.Component<"links.image-link", true>
  }
}

export interface SectionsProductShowcases extends Schema.Component {
  collectionName: "components_sections_product_showcases"
  info: {
    displayName: "Product Showcases"
  }
  attributes: {
    heading: Attribute.String & Attribute.Required
    products: Attribute.Relation<
      "sections.product-showcases",
      "oneToMany",
      "api::product.product"
    >
  }
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: "components_shared_meta_socials"
  info: {
    displayName: "metaSocial"
    icon: "project-diagram"
  }
  attributes: {
    socialNetwork: Attribute.Enumeration<["Facebook", "Twitter"]> &
      Attribute.Required
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60
      }>
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65
      }>
    image: Attribute.Media
  }
}

export interface SharedSeo extends Schema.Component {
  collectionName: "components_shared_seos"
  info: {
    displayName: "seo"
    icon: "search"
  }
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60
      }>
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50
        maxLength: 160
      }>
    metaImage: Attribute.Media
    metaSocial: Attribute.Component<"shared.meta-social", true>
    keywords: Attribute.Text
    metaRobots: Attribute.String
    structuredData: Attribute.JSON
    metaViewport: Attribute.String
    canonicalURL: Attribute.String
  }
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "buttons.button": ButtonsButton
      "buttons.icon-button": ButtonsIconButton
      "layout.header": LayoutHeader
      "layout.navbar": LayoutNavbar
      "links.button-link": LinksButtonLink
      "links.image-link": LinksImageLink
      "links.link": LinksLink
      "links.social-link": LinksSocialLink
      "product.price": ProductPrice
      "sections.hero": SectionsHero
      "sections.product-showcases": SectionsProductShowcases
      "shared.meta-social": SharedMetaSocial
      "shared.seo": SharedSeo
    }
  }
}
