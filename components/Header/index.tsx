import { Logo } from "../shared/Logo";
import { MainLink } from "../shared/MainLink";
import { builder } from "@builder.io/sdk";
import Dropdown from "./Dropdown";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function Header() {
  const links = await builder.getAll("nav-links", { prerender: false });

  const linkClass = "px-4 py-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:shadow-md hover:-translate-y-1"

  return (
    <header className="container mx-auto p-6 relative z-10">
      <div className="flex items-center">
        <MainLink>
          <Logo />
        </MainLink>

        <nav className="flex gap-2 ml-auto">
          {links.map((link) => (
            <Dropdown
              key={link.id}
              name={`${link.name}`}
              buttonClasses={`relative cursor-pointer ${linkClass}`}
              list={link.data?.links}
            />
          ))}
          <a href="/news/" className={`${linkClass}`}>Новости</a>
          <a href="/support/donate-2/" className={`${linkClass} bg-[var(--primary)] text-white hover:!bg-[var(--primary)]`}>
            Поддержать
          </a>
        </nav>
      </div>
    </header>
  )
}