import './Navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext, useState, useEffect } from 'react';
import { setAdminDetails } from '../../redux/adminSlice';
import apiUrl from '../../api/ApiUrl';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ThemeContext);
  const [userData, setUserData] = useState('');

  // Initialize dark mode state based on localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  // Update localStorage and dispatch context action on toggle
  const handleToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    dispatch({ type: 'Toggle' });
  };
  const fetchAdminDetails = async () => {
    try {
      const res = await fetch(apiUrl.adminDetails.url, {
        method: apiUrl.adminDetails.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success) {
        dispatch(setAdminDetails(data.data));
        setUserData(data.data);
      } else {
        console.error('Failed to fetch admin details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

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
          <div className="item" onClick={handleToggle}>
            {darkMode ? <DarkModeIcon className='icon' /> : <DarkModeOutlinedIcon className='icon' />}
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
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListAltRoundedIcon className='icon' />
          </div>
          <div className="item" onClick={()=> navigate(`/profile`)}>
            <img
              src={ userData?.profilePhoto || "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
