"use client"
import { Link } from "@/i18n/navigation"
import { StrapiImage } from "../StrapiImage"
import type { BannerItem } from "./types"
import { motion, Variants } from "framer-motion"

interface BannerListItemProps {
  item: BannerItem
}

const listItem: Variants = {
  hidden: { bottom: -150 },
  show: { bottom: 0, transition: { delay: 0, duration: 0.8 } },
}

/**
 *
 * TODO: Avoid animating the first two items for initial load
 *
 */
export function BannerListItem({ item }: BannerListItemProps) {
  return (
    <>
      <motion.div
        initial="hidden"
        viewport={{ once: true, margin: "50px" }}
        whileInView="show"
        transition={{ duration: 0.8 }}
        className="relative w-full h-full"
        variants={listItem}
      >
        <Link
          href={item.url}
          className="flex relative h-full w-full overflow-hidden rounded-lg"
        >
          <StrapiImage
            fill={true}
            src={item.image.url}
            alt=""
            className=" object-cover"
          />

          <div className="absolute left-0 bottom-0 z-[1] p-4 flex flex-col w-full md:p-6">
            <div>
              <h2 className="text-xl font-bold tracking-normal break-words text-white md:text-4xl md:max-w-[20ch]">
                {item.title}
              </h2>
            </div>
          </div>
          <div className="absolute w-full h-full left-0 bottom-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_80px,_rgba(0,0,0,0)_200px)]" />
        </Link>
      </motion.div>
    </>
  )
}
