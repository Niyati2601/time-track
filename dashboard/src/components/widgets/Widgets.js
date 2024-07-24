import React, { useEffect, useState } from 'react';
import './Widgets.scss'
import PersonOutline from '@mui/icons-material/PersonOutline';
import GridViewIcon from '@mui/icons-material/GridView';    
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import apiUrl from '../../api/ApiUrl';
import { useNavigate } from 'react-router-dom';

const Widgets = ({type}) => {

    const navigate = useNavigate();

    const [count, setCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);

    const fetchUsers = async () => {
        const res = await fetch(apiUrl.getAllUsers.url, {
            method: apiUrl.getAllUsers.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            setCount(data.data.length);
        }
    };

    const fetchProjects = async () => {
        const res = await fetch(apiUrl.getProjects.url, {
          method: apiUrl.getProjects.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        });
    
        const data = await res.json();
        if (data.success) {
          setProjectCount(data.data.length);
        }
      };

      const fetchCategories = async () => {
        const res = await fetch(apiUrl.getCategories.url, {
            method: apiUrl.getCategories.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await res.json();
        if (data.success) {
            setCategoryCount(data.data.length);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProjects();
        fetchCategories();
    }, []);

    const handleNavigation=()=>{
        if (data.link === 'View all users') {
            navigate('/users');
        }else if (data.link === 'View all projects') {
            navigate('/projects');
        }else if (data.link === 'View all Categories') {
            navigate('/categories');
        }else{
            navigate('/');
        }
    }

    let data;

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                link: 'View all users',
                amount: count,
                icon: (
                    <PersonOutline className='icon' />
                )
            }
            break;
        case 'order':
            data = {
                title: 'PROJECTS',
                isMoney: false,
                link: 'View all projects',
                amount: projectCount,
                icon: (
                   <GridViewIcon className='icon' />
                )
            }
            break;
        case 'earning':
            data = {
                title: 'CATEGORIES',
                isMoney: true,
                link: 'View all Categories',
                amount: categoryCount,
                icon: (
                    <CategoryIcon className='icon' />
                )
            }
            break;
        case 'balance':
            data = {
                title: 'BALANCE',
                isMoney: true,
                link: 'See details',
                amount: 50,
                icon: (
                    <AccountBalanceWalletIcon className='icon' />
                )
            }
            break;

        default:
            break;
            
    }
  return (
    <div className='widget'>
        <div className="left">
            <span className='title'>{data.title}</span>
            <span className='counter'>{data.isMoney} {data.amount}</span>
            <span className='link' onClick={handleNavigation}>{data.link}</span>
        </div>
        <div className="right">
            {data.icon}
        </div>
    </div>
  )
}

export default Widgets;