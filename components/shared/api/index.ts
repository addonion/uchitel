import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export const fetchNews = async () => {
  const res = await fetch('https://uchitel.ru/wp-json/wp/v2/news?isOnMain=1')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const news = await res.json()

  // Получаем изображения для каждой новости
  const newsWithImages = await Promise.all(news.map(async (item:any) => {
    if (item.featured_media) {
      const mediaRes = await fetch(`https://uchitel.ru/wp-json/wp/v2/media/${item.featured_media}`)
      // Проверяем статус ответа
      if (mediaRes.status === 401) {
        // Пропускаем эту новость
        item.featured_image_url = null
      } else if (!mediaRes.ok) {
        throw new Error('Network response was not ok')
      } else {
        const media = await mediaRes.json()
        item.featured_image_url = media.source_url
      }
    } else {
      item.featured_image_url = null
    }
    return item
  }))

  return newsWithImages
}

export const fetchLinks = async () => {
  const res = await fetch('https://uchitel.ru/wp-json/wp/v2/nested-menus')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const linksList = await res.json()

  return linksList
}