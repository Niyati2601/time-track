import React from 'react'
import './Projects.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import FeedbackDataTable from '../../components/datatable/FeedbackDataTable'
// import CategoriesDataTable from '../../components/datatable/CategoriesDatatable'

const Feedback = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <FeedbackDataTable />
        </div>
    </div>
  )
}

export default Feedback