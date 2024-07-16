import './Navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const Navbar = () => {
  const {dispatch} = useContext(ThemeContext);
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageIcon className='icon' />
            English
          </div>
          <div className="item" onClick={()=> dispatch({type: 'Toggle'})}>
            <DarkModeOutlinedIcon className='icon' />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className='icon' />
          </div>
          <div className="item">
            <NotificationsOutlinedIcon className='icon' />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <QuestionAnswerOutlinedIcon className='icon' />
            <div className="counter">1</div>
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListAltRoundedIcon className='icon' />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar