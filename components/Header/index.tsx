'use client'
import { Logo } from "../shared/Logo";
import { MainLink } from "../shared/MainLink";
import Dropdown from "./Dropdown";
import Hamburger from "./Hamburger";
import { fetchLinks, queryClient } from "../shared/api";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";

const NavLinks = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks
  })
  const linkClass = "px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:shadow-md data-[open]:bg-white data-[open]:shadow-md"

  if (!isSuccess) {
    return null
  }

  return (
    <nav className="hidden lg:flex gap-2 ml-auto">
      {data[0].items
        .map((link: any) => {
          if (link.children.length) {
            return (
              <Dropdown
                key={link.id}
                name={`${link.title}`}
                buttonClasses={`relative cursor-pointer ${linkClass}`}
                list={link.children}
              />
            )
          } else {
            return (
              <a href={link.url} className={`${linkClass}`}><b>{link.title}</b></a>
            )
          }
        })
      }

      <a href="/support/donate-2/" className={`${linkClass} bg-[var(--primary)] text-white hover:!bg-[var(--primary)] hover:-translate-y-1`}>
        <b>Поддержать</b>
      </a>
    </nav>
  )
}

const HamburgerNavLinks = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks
  })

  if (!isSuccess) {
    return null
  }

  return (
    <div className="lg:hidden">
      <Hamburger>
        {data[0].items
          .filter((link: any) => {
            return link.id !== 10970 && link.id !== 11550
          })
          .map((link: any) => (
            <div key={link.id} className="mt-4">
              <p className="mb-3">{link.title}</p>
              <ul className="grid gap-2 pl-4">
                {link.children.map((sub: any) => (
                  <li key={sub.url}>
                    <a href={sub.url}>{sub.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
        <p className="mt-3">
          <a href="/news/">Новости</a>
        </p>
      </Hamburger>
    </div>
  )
}

export function Header() {
  return (
    <QueryClientProvider client={queryClient}>
      <header className="container mx-auto px-4 lg:px-0 py-6 relative z-10">
        <div className="flex items-center">
          <MainLink>
            <Logo />
          </MainLink>

          <NavLinks />

          <HamburgerNavLinks />

        </div>
      </header>
    </QueryClientProvider>
  )
}