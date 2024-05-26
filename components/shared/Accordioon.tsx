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
        <Disclosure key={item.title}>
          <DisclosureButton className="group flex items-center justify-between gap-2 py-2 w-full font-bold text-lg text-left">
            {item.title}
            <div>
              <ChevronDownIcon className="w-6 group-data-[open]:rotate-180" />
            </div>
          </DisclosureButton>
          <DisclosurePanel className="text-gray-500 pb-2" dangerouslySetInnerHTML={{ __html: `${item.text}` }} />
        </Disclosure>
      ))}
    </div>
  )
}