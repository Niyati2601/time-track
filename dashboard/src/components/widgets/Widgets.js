import React, { useEffect, useState } from 'react';
import './Widgets.scss'
import PersonOutline from '@mui/icons-material/PersonOutline';
import GridViewIcon from '@mui/icons-material/GridView';    
import CategoryIcon from '@mui/icons-material/Category';
import ForumIcon from '@mui/icons-material/Forum';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import apiUrl from '../../api/ApiUrl';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Widgets = ({type}) => {

    const navigate = useNavigate();

    const [count, setCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [feedbackCount, setFeedbackCount] = useState(0);

    const fetchUsers = async () => {
        const res = await fetch(apiUrl.getAllUsers.url, {
            method: apiUrl.getAllUsers.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await res.json();
        const data1 = data.data.filter((data) => data?.role === "user" )
        const data2 = data.data.filter((data) => data?.role === "admin" )
        if (data.success) {
            setCount(data1.length);
            setAdminCount(data2.length);
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

    const fetchFeedbacks=async()=>{
        try {
            const res = await fetch(apiUrl.getAllFeedbacks.url, {
                method: apiUrl.getAllFeedbacks.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await res.json();
            if (data.success) {
                setFeedbackCount(data.data.length);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchProjects();
        fetchCategories();
        fetchFeedbacks();
    }, []);

    const handleNavigation=()=>{
        if (data.link === 'View all users') {
            navigate('/users');
        }else if (data.link === 'View all projects') {
            navigate('/projects');
        }else if (data.link === 'View all Categories') {
            navigate('/categories');
        }else if (data.link === 'View general Feedbacks') {
            navigate('/feedback');
        } else if (data.link === 'View all Admins') {
            navigate('/admins');
        }
        else{
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
        case 'projects':
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
        case 'categories':
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
        case 'feedbacks':
            data = {
                title: 'FEEDBACKS',
                isMoney: true,
                link: 'View general Feedbacks',    
                amount: feedbackCount,
                icon: (
                    <ForumIcon className='icon' />
                )
            }
            break;
            case 'Admins' : 
            data = {
                title: 'ADMINS',
                isMoney: false,
                link: 'View all Admins',
                amount: adminCount,
                icon: (
                    <SupervisorAccountIcon className='icon' />
                )
            }
            break;

        default:
            break;
            
    }
  return (
    <div className='widget'>
        <div className="left">
            <span className='title'>{data?.title}</span>
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