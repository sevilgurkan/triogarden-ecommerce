import { COMPONENT_NAMES } from "@/constants/component-names"

import { HeroSection } from "@/components/HeroSection"
import { BannerList } from "@/components/Banner/BannerList"
import { HeroVideoSection } from "@/components/Hero/HeroVideoSection"

export function blocksRenderer(block: any) {
  switch (block.__component) {
    case COMPONENT_NAMES.SECTIONS_HERO:
      return <HeroSection key={block.id} data={block} />
    case COMPONENT_NAMES.SECTIONS_HERO_VIDEO:
      return <HeroVideoSection key={block.id} data={block} />
    case COMPONENT_NAMES.SECTIONS_BANNERS:
      return <BannerList key={block.id} data={block} />
  }
}
