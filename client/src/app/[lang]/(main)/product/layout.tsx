import type { PropsWithChildren } from "react"

interface ProductLayoutProps extends PropsWithChildren {}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return <div>{children}</div>
}
