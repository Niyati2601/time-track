import React from 'react'
import './Projects.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import ProjectsDataTable from '../../components/ProjectsDataTable/ProjectsDataTable'

const Projects = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <ProjectsDataTable />
        </div>
    </div>
  )
}

export default Projects