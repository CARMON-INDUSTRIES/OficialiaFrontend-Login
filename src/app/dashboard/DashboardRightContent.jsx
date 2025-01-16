import React from 'react'
import DashboardHeader from './DashboardHeader'
import Stats from './Stats'
import Activities from './Activities'
import TopProductsAddUser from './TopProductsAddUser'

const DashboardRightContent = () => {
  return (
    <div className='w-[calc(100%-2rem)] pl-4 pr-9 h-full py-8 flex flex-col gap-4'>
        <DashboardHeader/> 
        <Stats/>   
        <Activities/> 
        <TopProductsAddUser/>
    </div>
  )
}

export default DashboardRightContent