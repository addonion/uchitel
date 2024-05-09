'use client'

import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'

export default function Dropdown({ name, buttonClasses, list }: { name: string, buttonClasses: string, list: any }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className={`${buttonClasses} inline-flex w-full justify-center gap-1`}>
            <b>{name}</b>
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {list.map((sup: any) => (
              <MenuItem key={sup.text}>
                <a
                  href={sup.url}
                  className="text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 block px-4 py-2 text-sm"
                >
                  {sup.text}
                </a>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
