import React from 'react'
import {BsSearch} from 'react-icons/bs'
import {MdNotificationsNone} from 'react-icons/md'
import Image from 'next/image'

const DashboardHeader = () => {
  return (
    <div className='py-2 flex items-center justify-between w-full'>
        <h1 className='font-bold text-2xl'>Dashboard</h1>
        <div className="search-noti-profile flex items-center gap-4">
            <div className="search relative">
                <input type="text" placeholder='search..' className='bg-white py-1 pl-4 border-none outline-none rounded-md' />
                <BsSearch className='absolute text-[#858585] translate-y-[-50%] top-1/2 transform right-7'/>
            </div>
            <MdNotificationsNone className='text-2xl'/>
            <div className="profile w-8 h-8 rounded-[50%] overflow-hidden">
            <Image width={100} height={100} src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="User-profile" />
            </div>
        </div>      
    </div>
  )
}

export default DashboardHeader