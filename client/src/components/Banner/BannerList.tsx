"use client"
import type { BannerItem } from "./types"
import { BannerListItem } from "./BannerListItem"

interface BannerListProps {
  data: {
    id: number
    __component: string
    bannerItems: BannerItem[]
  }
}

export function BannerList({ data }: BannerListProps) {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 grid-rows-[auto] gap-5 md:grid-cols-2">
        {data.bannerItems.map(item => (
          <div
            key={item.id}
            className="min-h-[288px] h-[calc(calc(100vw-2rem)*1.1)] md:h-[calc(calc(50vw-2.25rem)*1.1)] xl:h-[calc(calc((90rem-(1.5rem*2)-1.25rem)/2)*1.1)]"
          >
            <BannerListItem item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
