import React, { useEffect, useState } from 'react';
import './Widgets.scss'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import GridViewIcon from '@mui/icons-material/GridView';    
import CategoryIcon from '@mui/icons-material/Category';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import apiUrl from '../../api/ApiUrl';

const Widgets = ({type}) => {

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

    let data;

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                link: 'See all users',
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
                link: 'View net earnings',
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
            <span className='counter'>{data.isMoney && '$'} {data.amount}</span>
            <span className='link'>{data.link}</span>
        </div>
        <div className="right">
            {data.icon}
        </div>
    </div>
  )
}

export default Widgets;