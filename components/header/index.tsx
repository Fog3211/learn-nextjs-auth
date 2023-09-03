"use client";

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"

const navs = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Github',
    href: 'https://github.com/Fog3211/learn-nextjs-auth'
  }
]

export const Header = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <Image width={36} height={36} src="/next_auth_logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Learn Next Auth</span>
          </a>
          <div className="flex items-center lg:order-2">
            <Link href="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</Link>
          </div>
          <div className="hidden flex-1 pl-8 justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {
                navs.map((nav, index) => (
                  <li key={index}>
                    <a href={nav.href} className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">{nav.title}</a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
