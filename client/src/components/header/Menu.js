import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../other/Avatar';
import { useSelector } from 'react-redux';

const Menu = () => {
    const {auth} = useSelector(state=>state);
    const navLinks = [
        { label: 'Home', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/message' },
        { label: 'Discover', icon: 'explore', path: '/discover' }
    ]
    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons">{link.icon}</span>
                            </Link>
                        </li>
                    ))
                }
                {/* Noti */}
                <li className='nav-item dropdown' style={{ opacity: 1 }}>
                    <span className='nav-link dropdown-toggle' id='navbarDropdown'>
                        <Avatar src={auth.user.avatar} size='medium-avatar'/>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Menu;