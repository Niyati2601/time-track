import React from 'react'
import './Projects.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import CategoriesDataTable from '../../components/datatable/CategoriesDatatable'

const Categories = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <CategoriesDataTable />
        </div>
    </div>
  )
}

export default Categories