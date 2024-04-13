import type { PropsWithChildren } from "react"

interface CategoryLayoutProps extends PropsWithChildren {
  children: React.ReactNode
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return <div>{children}</div>
}
