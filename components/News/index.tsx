'use client'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { fetchNews } from "../shared/api"

const NewsList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { isPending, isError, data } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews
  })

  const posts = data ?? []
  const selectedPostIndex = posts.length
    ? Math.min(selectedIndex, posts.length - 1)
    : 0

  useEffect(() => {
    if (posts.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  if (isPending) {
    return (
      <div className="overflow-hidden bg-white rounded-[30px] h-[350px] flex items-center justify-center">
        <div>
          Загрузка…
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="overflow-hidden bg-white rounded-[30px] h-[350px] flex items-center justify-center">
        <div>
          Ошибка загрузки новостей, перезагрузите страницу
        </div>
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="overflow-hidden bg-white rounded-[30px] h-[350px] flex items-center justify-center">
        <div>
          Новости пока не опубликованы
        </div>
      </div>
    )
  }

  return (
    <TabGroup selectedIndex={selectedPostIndex} onChange={setSelectedIndex} >
      <TabList className="hidden">
        {posts.map((post, index) => (
          <Tab key={post.id}>{index}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {posts.map((post) => (
          <TabPanel key={post.id} className="overflow-hidden bg-white rounded-[30px] mb-[20px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full relative">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-video overflow-hidden"
                >
                  {post.featured_image_url ? (
                    <img
                      loading="lazy"
                      width={900}
                      height={450}
                      src={post.featured_image_url}
                      alt={post.title.rendered || "Новость"}
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center text-sm text-gray-500">
                      Новость
                    </div>
                  )}
                </a>
              </div>
              <div className="flex flex-col ml-5 w-7/12 max-md:ml-0 max-md:h-[180px] max-md:w-full">
                <div className="flex flex-col grow py-10 max-md:px-5 lg:pr-5 max-md:max-w-full max-sm:pt-5">
                  <h2 className="text-lg lg:text-2xl font-semibold" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div className="hidden lg:flex flex-col lg:mt-6">
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
      {posts.length > 1 && (
        <div className="hidden lg:flex justify-between mt-[-20px]">
          <button
            onClick={() => setSelectedIndex((selectedPostIndex - 1 + posts.length) % posts.length)}
            className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setSelectedIndex((selectedPostIndex + 1) % posts.length)}
            className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </TabGroup>
  )
}

export default function News() {
  return <NewsList />
}
