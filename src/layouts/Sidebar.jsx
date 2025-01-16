'use client'
import React from 'react'
import {BiUserCircle} from 'react-icons/bi'
import {FiPieChart} from 'react-icons/fi'
import {LuSettings} from 'react-icons/lu'
import {BsTags} from 'react-icons/bs'
import {TbCalendarCancel, TbLogout} from 'react-icons/tb'
import { signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const session = useSession()
  return (
    <div className='h-auto py-8 px-4 bg-[#4285F4] flex flex-col justify-start min-w-[16rem] rounded-3xl mx-8 my-6'>
        <div className="brand py-8 px-4 text-slate-100 font-extrabold">
            <h1 className='text-4xl'>Board.</h1>
            </div>
        <ul className="items flex flex-col list-none gap-4">
            <li><a className='px-5 py-2 hover:font-bold text-slate-100 transition-all focus:font-bold duration-200 ease-in-out flex items-center gap-2' href="#"><FiPieChart/>Dashboard</a></li>
            <li><a className='px-5 py-2 hover:font-bold text-slate-100 transition-all focus:font-bold duration-200 ease-in-out flex items-center gap-2' href="#"><BsTags/>Transaction</a></li>
            <li><a className='px-5 py-2 hover:font-bold text-slate-100 transition-all focus:font-bold duration-200 ease-in-out flex items-center gap-2' href="#"><TbCalendarCancel/>Schedules</a></li>
            <li><a className='px-5 py-2 hover:font-bold text-slate-100 transition-all focus:font-bold duration-200 ease-in-out flex items-center gap-2' href="#"><BiUserCircle/>Users</a></li>
            <li><a className='px-5 py-2 hover:font-bold text-slate-100 transition-all focus:font-bold duration-200 ease-in-out flex items-center gap-2' href="#"><LuSettings/>Settings</a></li>
            <li onClick={() => signOut('google')} ><button className='px-5 py-2 hover:font-bold text-slate-100 transition-all focus:font-bold duration-200 ease-in-out flex items-center gap-2'><TbLogout/>Log Out</button></li>
        </ul>
        <div className="foot flex flex-col gap-2 mt-auto pb-4">
            <div><a className='font-extralight px-5 py-2 hover:font-medium focus:font-medium transition-all duration-100 ease-in-out text-slate-100' href="#">Help</a></div>
            <div><a className='font-extralight px-5 py-2 hover:font-medium focus:font-medium transition-all duration-100 ease-in-out text-slate-100' href="#">Contact Us</a></div>
        </div>

    </div>
  )
}

export default Sidebar