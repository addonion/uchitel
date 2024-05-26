'use client'

import { usePathname } from "next/navigation";


const MainLink = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  if (isHomePage) {
    return <>{children}</>
  }

  return (
    <a href="/">
      { children }
    </a>
  )
}

export { MainLink }