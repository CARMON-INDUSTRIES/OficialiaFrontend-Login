import React from 'react'
import BarChart from '../../components/BarChart'

const Activities = () => {
  return (
    <div className='w-full max-h-96 border-2 border-[#E0E0E0] drop-shadow-md rounded-[20px] py-4 px-8'>
        <h1 className='font-bold text-2xl'>Activities</h1>
        <div className="period-mark flex items-center justify-between">
            <p className='text-[#858585]'>May - June 2021</p>
            <div className="mark flex items-center gap-4">
                <div className="guest flex items-center gap-2">
                    <i className='w-3 h-3 rounded-[50%] bg-[#E9A0A0]'></i>
                    Guest
                </div>
                <div className="user flex items-center gap-2">
                    <i className='w-3 h-3 rounded-[50%] bg-[#9BDD7C]'></i>
                    User
                </div>
            </div>
        </div>
        <BarChart/>
    </div>
  )
}

export default Activities