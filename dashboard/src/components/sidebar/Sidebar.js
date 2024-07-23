import './Sidebar.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import apiUrl from '../../api/ApiUrl';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InsightsIcon from '@mui/icons-material/Insights';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Sidebar = () => {
    const { dispatch } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const res = await fetch(apiUrl.logout.url, {
                method: apiUrl.logout.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.success) {
                navigate('/login');
            } else {
                console.error('Failed to fetch admin details:', data.message);
            }
        } catch (error) {
            console.error('Error fetching admin details:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmLogout = () => {
        handleLogout();
        closeModal();
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Time-Track Admin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className='icon' />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/projects" style={{ textDecoration: "none" }}>
                        <li>
                            <GridViewIcon className='icon' />
                            <span>Projects</span>
                        </li>
                    </Link>
                    <Link to="/categories" style={{ textDecoration: "none" }}>
                        <li>
                            <CategoryIcon className='icon' />
                            <span>Categories</span>
                        </li>
                    </Link>
                    <li>
                        <LocalShippingIcon className='icon' />
                        <span>Delivery</span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                        <InsightsIcon className='icon' />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsActiveIcon className='icon' />
                        <span>Notifications</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <HealthAndSafetyIcon className='icon' />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyIcon className='icon' />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsIcon className='icon' />
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <li onClick={() =>navigate('/profile')}>
                        <AccountCircleIcon className='icon' />
                        <span>Profile</span>
                    </li>
                    <li onClick={openModal}>
                        <LogoutIcon className='icon' />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: 'Light' })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: 'Dark' })}></div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-body">
                            <p>Are you sure you want to logout?</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeModal} className="btn btn-cancel">Cancel</button>
                            <button onClick={confirmLogout} className="btn btn-confirm">Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
