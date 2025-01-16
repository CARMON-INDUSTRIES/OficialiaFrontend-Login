'use client'
import React from 'react'
import Sidebar from '../../layouts/Sidebar'
import DashboardRightContent from './DashboardRightContent'
import AddUser from '../../components/AddUser'

const Dashboard = () => {
  return (
    <div className='w-full min-h-screen flex relative bg-slate-50'>
        <Sidebar/>
        <DashboardRightContent/>
        <AddUser/>
    </div>
  )
}

export default Dashboard