import AdminDataTable from '../../components/datatable/AdminDatatable';
// import DataTable from '../../components/datatable/Datatable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './List.scss';

const Admin = () => {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <AdminDataTable />
      </div>
    </div>
  )
}

export default Admin