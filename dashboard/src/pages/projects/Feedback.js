import React from 'react'
import './Projects.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
// import CategoriesDataTable from '../../components/datatable/CategoriesDatatable'

const Feedback = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {/* <CategoriesDataTable /> */}
        Feedback
        </div>
    </div>
  )
}

export default Feedback