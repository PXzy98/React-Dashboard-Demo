import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import './Header.css';

function Header() {
    return (
        // <div className="Header" style="padding: 60px; text-align: center; background: #1abc9c; color: white; font-size: 30px;">
        <div className="Header">
            <Avatar alt="logo" src="/img/avatar.jpg" />
            <h3 className="HeaderText"> Order Dashboard</h3>

        </div>
    );


  

}

export default Header;