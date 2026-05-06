import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export type NewsItem = {
  id: number
  link: string
  featured_media?: number
  featured_image_url?: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  [key: string]: unknown
}

type MediaResponse = {
  source_url?: string
}

type RawRecord = Record<string, unknown>

export type MenuLink = {
  id: number
  title: string
  text?: string
  url: string
  children: MenuLink[]
}

type NestedMenu = {
  items: MenuLink[]
}

const isRecord = (value: unknown): value is RawRecord =>
  typeof value === "object" && value !== null

const getString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback

const getNumber = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  }

  return undefined
}

const getRendered = (value: unknown) =>
  isRecord(value) ? getString(value.rendered) : ""

const normalizeNewsItem = (value: unknown): NewsItem | null => {
  if (!isRecord(value)) {
    return null
  }

  const id = getNumber(value.id)
  if (!id) {
    return null
  }

  return {
    ...value,
    id,
    link: getString(value.link, "#"),
    featured_media: getNumber(value.featured_media),
    featured_image_url: getString(value.featured_image_url) || undefined,
    title: {
      rendered: getRendered(value.title),
    },
    excerpt: {
      rendered: getRendered(value.excerpt),
    },
  }
}

const normalizeMenuLink = (value: unknown): MenuLink | null => {
  if (!isRecord(value)) {
    return null
  }

  const id = getNumber(value.id)
  if (!id) {
    return null
  }

  const children = Array.isArray(value.children)
    ? value.children.flatMap((child) => {
        const link = normalizeMenuLink(child)
        return link ? [link] : []
      })
    : []

  return {
    id,
    title: getString(value.title),
    text: getString(value.text) || undefined,
    url: getString(value.url, "#"),
    children,
  }
}

export const fetchNews = async (): Promise<NewsItem[]> => {
  const res = await fetch('https://uchitel.ru/wp-json/wp/v2/news?isOnMain=1')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const news = await res.json()
  const newsItems = Array.isArray(news)
    ? news.flatMap((item) => {
        const newsItem = normalizeNewsItem(item)
        return newsItem ? [newsItem] : []
      })
    : []

  // Получаем изображения для каждой новости
  const newsWithImages = await Promise.all(newsItems.map(async (item) => {
    if (item.featured_media) {
      const mediaRes = await fetch(`https://uchitel.ru/wp-json/wp/v2/media/${item.featured_media}`)
      // Проверяем статус ответа
      if (mediaRes.status === 401) {
        // Пропускаем эту новость
        item.featured_image_url = undefined
      } else if (!mediaRes.ok) {
        throw new Error('Network response was not ok')
      } else {
        const media = await mediaRes.json() as MediaResponse
        item.featured_image_url = media.source_url
      }
    } else {
      item.featured_image_url = undefined
    }
    return item
  }))

  return newsWithImages
}

export const fetchLinks = async (): Promise<NestedMenu[]> => {
  const res = await fetch('https://uchitel.ru/wp-json/wp/v2/nested-menus')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const linksList = await res.json()

  if (!Array.isArray(linksList)) {
    return []
  }

  return linksList.map((menu) => ({
    items: isRecord(menu) && Array.isArray(menu.items)
      ? menu.items.flatMap((item) => {
          const link = normalizeMenuLink(item)
          return link ? [link] : []
        })
      : [],
  }))
}
