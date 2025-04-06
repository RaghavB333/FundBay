"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleBlur = (e) => {
    // If the blurred element is not part of the dropdown, close the dropdown
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setShowdropdown(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowdropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className='bg-gray-950 shadow-lg shadow-white text-white flex justify-between px-4 md:h-16 items-center max-md:flex-col max-md:w-[100vw]'>
      <Link href={"/"} className="logo text-lg font-bold flex justify-center items-center">
        <img src="donate2.gif" width={44} alt="" className='pb-2 invertImg' />
        <span className='m-1 max-md:pr-10'>FundBay</span>
      </Link>

      <div className='relative'>
        <Link href="/">
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-md:flex max-md:justify-center max-md:items-center max-md:relative max-md:left-[2px] max-md:h-14"
          >
            Home
          </button>
        </Link>

        {session && session.user && (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              id="dropdownDefaultButton"
              className="max-md:max-w-[50vw] max-md:flex max-md:justify-center max-md:items-center max-md:absolute max-md:left-[-120px] max-md:h-14 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mx-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onBlur={handleBlur}
            >
              Welcome {session.user.email}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`${showdropdown ? "" : "hidden"} absolute left-[150px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 max-md:absolute max-md:left-[-60px] max-md:top-16 z-50`}
              ref={dropdownRef}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
<Link
  href={`${process.env.NEXT_PUBLIC_URL}/${session.user.name}`}
  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
>
  Your Page
</Link>
                </li>
                <li>
                  <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {session && (
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-md:flex max-md:justify-center max-md:items-center max-md:relative max-md:left-28 max-md:h-14"
            onClick={() => signOut({ callbackUrl: '/login' })}

          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 max-md:flex max-md:justify-center max-md:items-center max-md:relative max-md:left-[2px] max-md:h-14"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
