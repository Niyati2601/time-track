import React from 'react';
import noData from '../../assets/noData.svg';
import { GoPlus } from "react-icons/go";

const Dashboard = () => {
  return (
    <div className='flex flex-col bg-gray-100 min-h-screen p-4'>
      <div className='flex space-x-4 w-full'>
        <div className='w-1/3 p-4 bg-white rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold'>Card 1</h2>
          <p className='mt-2 text-gray-600'>This is the content of the first card.</p>
        </div>
        <div className='w-1/3 p-4 bg-white rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold'>Card 2</h2>
          <p className='mt-2 text-gray-600'>This is the content of the second card.</p>
        </div>
        <div className='w-1/3 p-4 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl text-gray-600 font-semibold border-b-2 pb-2'>Activity Logs</h1>
          <div className='flex justify-center items-center mt-4'>
            <img src={noData} alt='image-no-data' style={{width: '70%'}} />
          </div>
        </div>
      </div>
      <div className='w-1/2 p-4 bg-white rounded-lg shadow-md mt-4'>
        <h1 className='text-2xl text-gray-600 font-semibold border-b-2 pb-2'>Projects WatchList</h1>
        <div className='flex flex-col items-center'>
          <button className='flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4'>
            <GoPlus className='mr-2' />
            Add Project
          </button>
          <p className='mt-2 text-gray-600 text-center'>Customize your watchlist by adding projects based on your preference.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
