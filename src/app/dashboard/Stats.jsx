import React from 'react'
import {TbBusinessplan} from 'react-icons/tb'
import {BsTags} from 'react-icons/bs'
import {BiLike} from 'react-icons/bi'
import {PiUsers} from 'react-icons/pi'


const Stats = () => {
  return (
    <div className='grid grid-cols-4 gap-4 rounded-2xl py-4'>
        <div className="revenue rounded-[20px] bg-white py-4 px-6 drop-shadow-md border-2 border-[#E0E0E0]">
            <div className="icon p-2 bg-[#98D89E] w-fit rounded-[50%] grid place-items-center">
                <TbBusinessplan className='font-light text-white'/>
            </div>
            <p className='py-1'>Total Revenues</p>
            <div className="amount-growth flex justify-between items-center">
                <h1 className='text-xl font-bold'>$2,129,430</h1>
                <span className='text-xs bg-[#E9F9EB] rounded-[20px] px-2 py-1 text-[#4AD15F]'>+2.5%</span>
            </div>
        </div>
        <div className="transaction rounded-[20px] bg-white py-4 px-6 drop-shadow-md border-2 border-[#E0E0E0]">
            <div className="icon p-2 bg-[#DEBF85] w-fit rounded-[50%] grid place-items-center">
                <BsTags className='font-light text-white'/>
            </div>
            <p className='py-1'>Total Transactions</p>
            <div className="amount-growth flex justify-between items-center">
                <h1 className='text-xl font-bold'>$1,520</h1>
                <span className='text-xs bg-[#E9F9EB] rounded-[20px] px-2 py-1 text-[#4AD15F]'>+1.7%</span>
            </div>
        </div>
        <div className="total-likes rounded-[20px] bg-white py-4 px-6 drop-shadow-md border-2 border-[#E0E0E0]">
            <div className="icon p-2 bg-[#ECA4A4] w-fit rounded-[50%] grid place-items-center">
                <BiLike className='font-light text-white'/>
            </div>
            <p className='py-1'>Total Likes</p>
            <div className="amount-growth flex justify-between items-center">
                <h1 className='text-xl font-bold'>$9,721</h1>
                <span className='text-xs bg-[#E9F9EB] rounded-[20px] px-2 py-1 text-[#4AD15F]'>+1.4%</span>
            </div>
        </div>
        <div className="total-users rounded-[20px] bg-white py-4 px-6 drop-shadow-md border-2 border-[#E0E0E0]">
            <div className="icon p-2 bg-[#A9B0E5] w-fit rounded-[50%] grid place-items-center">
                <PiUsers className='font-light text-white'/>
            </div>
            <p className='py-1'>Total Users</p>
            <div className="amount-growth flex justify-between items-center">
                <h1 className='text-xl font-bold'>$9,721</h1>
                <span className='text-xs bg-[#E9F9EB] rounded-[20px] px-2 py-1 text-[#4AD15F]'>+4.2%</span>
            </div>
        </div>
    </div>
  
  )
}

export default Stats