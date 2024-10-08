'use client'

import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import styles from './style.module.scss'
import Link from 'next/link'

const Icon = () => (
  <svg viewBox="0 0 60 40" >
    <g
      stroke="#575B5E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path className={styles.top} d="M10,10 L50,10 Z"></path>
      <path className={styles.middle} d="M10,20 L50,20 Z"></path>
      <path className={styles.bottom} d="M10,30 L50,30 Z"></path>
    </g>
  </svg>
)


export default function Hamburger({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false)

  const togleMenu = () => {
    setOpen(!open)
  }

  const hamburgerClass = open
    ? `${styles.hamburger} ${styles.active}`
    : `${styles.hamburger}`

  return (
    <>
      <div className={hamburgerClass} onClick={togleMenu}>
        <Icon />
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white p-8 shadow-xl text-lg">
                      <div className={hamburgerClass} onClick={togleMenu}>
                        <Icon />
                      </div>

                      {children}

                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

