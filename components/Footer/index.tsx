import Logo from "../Logo";
import "./style.css"
import { builder } from "@builder.io/sdk";

// Replace with your Public API Key.
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export default async function Footer() {
  const links = await builder.getAll("nav-links", { prerender: false });

  return (
    <footer className="px-6 py-12 mt-12">
      <div className="container mx-auto lg:grid grid-cols-12 grid-rows-2 gap-10 text-white">
        <div className="lg:col-span-5 mb-6 lg:mb-0">
          <Logo color="white" />
        </div>
        <div className="lg:col-span-7 row-span-2 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6 lg:mb-0">
          {links.map((link) => (
            <div key={link.id}>
              <p className="mb-3">{link.name}</p>
              <ul className="grid gap-2">
                {link.data?.links.map((sub:any) => (
                  <li key={sub.url}>
                    <a href={sub.url}>{sub.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-3">Мы в соцсетях</p>
            <ul className="grid gap-2">
              <li><a href="https://vk.com/choosetoteachrussia" target="_blank">vk.com</a></li>
              <li><a href="https://www.youtube.com/channel/UCsEEzd2ULv7L_y3C1B1LewQ" target="_blank">youtube.com</a></li>
              <li><a href="https://t.me/choosetoteach_official" target="_blank">telegram</a></li>
              <li><a href="https://dzen.ru/choosetoteach" target="_blank">Дзен</a></li>
            </ul>
          </div>
        </div>
        <div className="col-span-5">
          © Все права защищены и принадлежат Благотворительному фонду «Новый учитель».
          Использование любых материалов сайта допускается только по предварительному согласованию с правообладателем.
          ИНН/КПП: 7710493032 / 771001001 Благотворительный фонд «Новый учитель» зарегистрирован по адресу Садовая-Триумфальная ул., 16, стр. 3, Москва, 127006.
        </div>
      </div>
    </footer>
  )
}
