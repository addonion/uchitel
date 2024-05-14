import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

type Data = {
  title: string,
  text: string
}[]

export default function Accordioon({ data }: {data:Data}) {
  return (
    <div className='grid gap-3'>
      {data.map((item) => (
        <div className='bg-white py-2 px-6 rounded-xl'>
          <Disclosure key={item.title}>
            <DisclosureButton className="group flex items-center justify-between gap-2 py-2 w-full font-bold text-lg">
              {item.title}
              <ChevronDownIcon className="w-6 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="text-gray-500 pb-2" dangerouslySetInnerHTML={{ __html: `${item.text}` }} />
          </Disclosure>
        </div>
      ))}
    </div>
  )
}