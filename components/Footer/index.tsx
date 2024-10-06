'use client'
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Logo } from "../shared/Logo";
import { MainLink } from "../shared/MainLink";
import style from "./styles.module.css"
import { fetchLinks, queryClient } from "../shared/api";

const LinksList = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks
  })

  if (!isSuccess) {
    return null
  }

  return (
    data[0].items
      // @ts-ignore
      .filter((link) => {
        return link.id !== 10970 && link.id !== 11550
      })
      // @ts-ignore
      .map((link) => (
        <div key={link.id}>
          <p className="mb-3">{link.title}</p>
          <ul className="grid gap-2">
            {link.children?.map((sub: any) => (
              <li key={sub.url}>
                <a href={sub.url}>{sub.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ))
  )
}

export default function Footer() {
  return (
    <QueryClientProvider client={queryClient}>
      <footer className={`${style.footer} px-6 py-12 mt-12`}>
        <div className="container mx-auto lg:grid grid-cols-12 grid-rows-2 gap-10 text-white">
          <div className="lg:col-span-5 mb-6 lg:mb-0">
            <MainLink>
              <Logo color="white" />
            </MainLink>
          </div>
          <div className="lg:col-span-7 row-span-2 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6 lg:mb-0">
            <LinksList />
            <div>
              <p className="mb-6">
                <a href="/news/">Новости</a>
              </p>
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
    </QueryClientProvider>
  )
}
