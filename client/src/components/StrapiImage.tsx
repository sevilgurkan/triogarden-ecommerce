import Image, { ImageProps } from "next/image"
import { getStrapiMedia } from "@/utils/strapi"

interface StrapiImageProps {
  src: string
  alt: string
  height: number
  width: number
  className?: string
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<StrapiImageProps>) {
  if (!src) return null
  const imageUrl = getStrapiMedia(src)
  const imageFallback = `https://placehold.co/${width}x${height}`

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  )
}
