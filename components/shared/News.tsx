'use client'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const queryClient = new QueryClient()

const fetchNews = async () => {
  const res = await fetch('https://uchitel.ru/wp-json/wp/v2/news')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const news = await res.json()

  // Получаем изображения для каждой новости
  const newsWithImages = await Promise.all(news.map(async (item:any) => {
    if (item.featured_media) {
      const mediaRes = await fetch(`https://uchitel.ru/wp-json/wp/v2/media/${item.featured_media}`)
      if (!mediaRes.ok) {
        throw new Error('Network response was not ok')
      }
      const media = await mediaRes.json()
      item.featured_image_url = media.source_url
    } else {
      item.featured_image_url = null
    }
    return item
  }))

  return newsWithImages
}

const NewsList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % 10);
    }, 4000); // Переключение каждые 3 секунды

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, [selectedIndex]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} className="relative">
      <TabList className="hidden">
        {data?.map((post, index) => (
          <Tab key={post.id}>{index}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data?.map((post) => (
          <TabPanel key={post.id} className="overflow-hidden bg-white rounded-[30px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full relative">
                <a
                  href={post.link}
                  target="_blank"
                  className=" aspect-video overflow-hidden"
                >
                  <img
                    loading="lazy"
                    src={post.featured_image_url}
                    alt={post.title.rendered}
                    className="grow self-stretch w-full max-md:w-full max-md:max-w-full "
                  />
                </a>
              </div>
              <div className="flex flex-col ml-5 w-7/12 max-md:ml-0 max-md:h-[360px] max-md:w-full">
                <div className="flex flex-col grow py-10 max-md:px-5 max-md:max-w-full max-sm:pt-5">
                  <h2 className="text-2xl font-semibold" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                  <div className="flex flex-col mt-6 ">
                    <div className="flex flex-col" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
                    <a
                      href={post.link}
                      target="_blank"
                      className="justify-center self-start px-6 py-2.5 mt-8 text-base font-medium leading-5 text-white bg-blue-600 rounded-xl cursor-pointer pointer-events-auto max-md:px-5"
                      tabIndex={0}
                    >
                      Читать далее
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        ))}
      </TabPanels>
      <div className="flex justify-between mt-[-20px]">
        <button
          onClick={() => setSelectedIndex((selectedIndex - 1 + data.length) % data.length)}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button
          onClick={() => setSelectedIndex((selectedIndex + 1) % data.length)}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
      </div>
    </TabGroup>
  )
}

export const News = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsList />
    </QueryClientProvider>
  )
}