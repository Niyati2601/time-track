import Sidebar from '../../components/sidebar/Sidebar';
import './Home.scss';
import Navbar from '../../components/navbar/Navbar';
import Widgets from '../../components/widgets/Widgets';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widgets type='user' />
          <Widgets type='projects' />
          <Widgets type='categories'/>
          <Widgets type='feedbacks' />
          <Widgets type='Admins' />
        </div>
        <div className="charts">
          <Featured />
          <Chart title={"Last 6 Months (Revenue)"} aspect={2/1}/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transaction</div>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Home