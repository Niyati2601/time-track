import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import MainButtons from '../../components/MainButtons'

const ClockInOut = () => {
  return (
    <div className="flex h-screen relative">
    <Sidebar />
    <div className="flex flex-col flex-grow bg-gray-100">
      <Navbar />
      <div className="flex-grow p-4 bg-white-100">
       CLOCK IN OUT
      </div>
    </div>
    <MainButtons className="absolute bottom-4 right-4" />
  </div>
  )
}

export default ClockInOut