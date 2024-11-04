'use client'
import { Logo } from "../shared/Logo";
import { MainLink } from "../shared/MainLink";
import Dropdown from "./Dropdown";
import Hamburger from "./Hamburger";
import { fetchLinks, queryClient } from "../shared/api";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import Link from "next/link";

const linkClass = "px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:shadow-md data-[open]:bg-white data-[open]:shadow-md"

const NavLinks = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks
  })

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
        <Link href="/">Главная страница</Link>

        <div className='mb-6'>
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
        </div>

        <a
          href="/support/donate-2/"
          className='mt-auto py-4 bg-[var(--primary)] text-white text-center rounded-xl'
        >
          Поддержать
        </a>
      </Hamburger>
    </div>
  )
}

export function Header() {
  if (process.env.NEXT_PUBLIC_DOMAIN === "https://uchitel.vercel.app") {
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

  return (
    <QueryClientProvider client={queryClient}>
      <header className="container mx-auto px-4 lg:px-0 py-6 relative z-10">
        <div className="flex items-center">
          <a href="https://uchitel.ru" target="_blank">
            <Logo />
          </a>

          <nav className="hidden xl:flex gap-2 ml-auto">
            <a href="https://konturkultury.uchitel.ru/#kak" className={linkClass}><b>Как все устроено</b></a>
            <a href="https://konturkultury.uchitel.ru/#labs" className={linkClass}><b>Творческие лаборатории</b></a>
            <a href="https://konturkultury.uchitel.ru/#itogi" className={linkClass}><b>Итоги</b></a>
            <a href="https://konturkultury.uchitel.ru/team/" className={linkClass}><b>Команда</b></a>

            <a href="https://vk.com/kk_vladivostok2024" target="_blank" className={`${linkClass} bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-primary hover:-translate-y-1 ml-2`}>
              <b>Группа вконтакте</b>
            </a>

            <a href="https://uchitel.ru/support/donate-2/" target="_blank" className={`${linkClass} bg-[var(--primary)] text-white hover:!bg-[var(--primary)] hover:-translate-y-1 ml-2`}>
              <b>Поддержать</b>
            </a>
          </nav>

          <div className="xl:hidden">
            <Hamburger>
              <p>
                <a href="https://konturkultury.uchitel.ru/#kak"><b>Как все устроено</b></a>
              </p>
              <p className="mt-3">
                <a href="https://konturkultury.uchitel.ru/#labs"><b>Творческие лаборатории</b></a>
              </p>
              <p className="mt-3">
                <a href="https://konturkultury.uchitel.ru/#itogi"><b>Итоги</b></a>
              </p>
              <p className="mt-3">
                <a href="https://konturkultury.uchitel.ru/team/"><b>Команда</b></a>
              </p>

              <a
                href="https://vk.com/kk_vladivostok2024"
                target="_blank"
                className='mt-auto py-4  text-center rounded-xl'
              >
                Группа вконтакте
              </a>
              <a
                href="https://uchitel.ru/support/donate-2/"
                target="_blank"
                className='mt-4 py-4 bg-[var(--primary)] text-white text-center rounded-xl'
              >
                Поддержать
              </a>
            </Hamburger>
          </div>

        </div>
      </header>
    </QueryClientProvider>
  )

}