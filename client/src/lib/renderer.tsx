import { COMPONENT_NAMES } from "@/constants/component-names"

import { HeroSection } from "@/components/HeroSection"
import { ProductShowcases } from "@/components/ProductShowcases"
import { BaseHeader } from "@/components/Layout/Header"

export function blocksRenderer(block: any) {
  switch (block.__component) {
    case COMPONENT_NAMES.LAYOUT_HEADER:
      return <BaseHeader key={block.id} data={block} />
    case COMPONENT_NAMES.SECTIONS_HERO:
      return <HeroSection key={block.id} data={block} />
    case COMPONENT_NAMES.SECTIONS_PRODUCT_SHOWCASES:
      return <ProductShowcases key={block.id} data={block} />
  }
}
