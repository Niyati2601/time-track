import React from 'react';
import './Widgets.scss'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Widgets = ({type}) => {

    let data;
    const amount = 100;
    const diff = 20;

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                link: 'See all users',
                icon: (
                    <PersonOutline className='icon' />
                )
            }
            break;
        case 'order':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: 'View all orders',
                icon: (
                   <AddShoppingCartIcon className='icon' />
                )
            }
            break;
        case 'earning':
            data = {
                title: 'EARNINGS',
                isMoney: true,
                link: 'View net earnings',
                icon: (
                    <CurrencyRupeeIcon className='icon' />
                )
            }
            break;
        case 'balance':
            data = {
                title: 'BALANCE',
                isMoney: true,
                link: 'See details',
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
            <span className='counter'>{data.isMoney && '$'} {amount}</span>
            <span className='link'>{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpOutlinedIcon />
                {diff} %
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widgets;