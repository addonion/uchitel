import { Logo } from "../shared/Logo";
import { MainLink } from "../shared/MainLink";
import { builder } from "@builder.io/sdk";
import Dropdown from "./Dropdown";
import Hamburger from "./Hamburger";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function Header() {
  const links = await builder.getAll("nav-links", { prerender: false });

  const linkClass = "px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:shadow-md data-[open]:bg-white data-[open]:shadow-md"

  return (
    <header className="container mx-auto py-6 relative z-10">
      <div className="flex items-center">
        <MainLink>
          <Logo />
        </MainLink>

        <nav className="hidden lg:flex gap-2 ml-auto">
          {links.map((link) => (
            <Dropdown
              key={link.id}
              name={`${link.name}`}
              buttonClasses={`relative cursor-pointer ${linkClass}`}
              list={link.data?.links}
            />
          ))}
          <a href="/news/" className={`${linkClass}`}><b>Новости</b></a>
          <a href="/support/donate-2/" className={`${linkClass} bg-[var(--primary)] text-white hover:!bg-[var(--primary)] hover:-translate-y-1`}>
            <b>Поддержать</b>
          </a>
        </nav>

        <div className="lg:hidden">
          <Hamburger>
            {links.map((link) => (
              <div key={link.id} className="mt-4">
                <p className="mb-3">{link.name}</p>
                <ul className="grid gap-2 pl-4">
                  {link.data?.links.map((sub:any) => (
                    <li key={sub.url}>
                      <a href={sub.url}>{sub.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Hamburger>
        </div>

      </div>
    </header>
  )
}