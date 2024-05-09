'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";


const MainLink = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <>{children}</>
  }

  return (
    <Link href="/">
      { children }
    </Link>
  )
}

export { MainLink }