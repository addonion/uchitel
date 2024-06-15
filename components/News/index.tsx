'use client'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { fetchNews } from "../shared/api"
import Image from 'next/image'

const queryClient = new QueryClient()

const NewsList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % 10);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedIndex]);

  const { isPending, isError, data } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  })

  if (isPending || isError) {
    return (
      <div className="overflow-hidden bg-white rounded-[30px] h-[350px] flex items-center justify-center">
        <div>
          Загрузка…
        </div>
      </div>
    )
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
          <TabPanel key={post.id} className="overflow-hidden bg-white rounded-[30px] mb-[20px]">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full relative">
                <a
                  href={post.link}
                  target="_blank"
                  className="aspect-video overflow-hidden"
                >
                  <Image
                    loading="lazy"
                    width={900}
                    height={450}
                    src={post.featured_image_url}
                    alt={post.title.rendered}
                  />
                </a>
              </div>
              <div className="flex flex-col ml-5 pr-5 w-7/12 max-md:ml-0 max-md:h-[360px] max-md:w-full">
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
      <div className="hidden lg:flex justify-between mt-[-20px]">
        <button
          onClick={() => setSelectedIndex((selectedIndex - 1 + data.length) % data.length)}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button
          onClick={() => setSelectedIndex((selectedIndex + 1) % data.length)}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
      </div>
    </TabGroup>
  )
}

export default function News() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsList />
    </QueryClientProvider>
  )
}