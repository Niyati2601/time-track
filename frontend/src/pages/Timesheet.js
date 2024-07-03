import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MainButtons from '../components/MainButtons'


const Timesheet = () => {
  return (
    <div className="flex h-screen relative">
    <Sidebar />
    <div className="flex flex-col flex-grow bg-gray-100">
        <Navbar />
    </div>
    <MainButtons className="absolute bottom-4 right-4" />
    </div>
  )
}

export default Timesheet
