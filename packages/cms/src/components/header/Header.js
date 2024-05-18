import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Close from '../../assets/close.svg';
import Menu from '../../assets/menu.svg';

function Header() {
    const auth = useSelector(state => state.auth)

    const { user, isLogged = true, isAdmin=1 } = auth;
    const token = useSelector(state => state.token)
    const [menu, setMenu] = useState(false);
    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create-user">Create User</Link></li>
                <li><Link to="/users">Users</Link></li>
            </>
        )
    }
    const userLink = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
            // <li className='drop-nav'>
            // <Link to="#" className='avatar'>
            //     <img src={user.avatar} alt="" /> {user.name} <i className="fas fa-angle-down"></i>
            // </Link>
            //     <ul className='dropdown'>
            //         <li><Link to="/profile">Profile</Link></li>
            //         <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            //     </ul>
            // </li>
        )
    }
    const handleLogout = async () => {
        try {
            await axios.post('api/auth/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem("firstLogin");
            window.location.href = "/";
        } catch (error) {
            window.location.href = "/";
        }
    }
    
    // const transform = {
    //     transform: isLogged ? "translateY(-5px)" : 0
    // }
    
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>
            <div className='logo'>
                <h1><Link to="/">{isAdmin ? 'Dashboard' : 'Dev-VN✮Auth'}</Link></h1>
            </div>
            <ul style={styleMenu}>
                {
                    isLogged && <li>
                        <Link to="/profile" className='avatar'>
                            <img src={user.avatar} alt="" /> {user.username}
                        </Link>
                    </li>
                }
                {isAdmin && adminRouter()}
                {
                    isLogged
                        ? userLink()
                        : <li><Link to="/login"><i className="fas fa-user"></i> Login ✥ Register</Link></li>
                }
                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>
            {
                !isAdmin
                && <div className="cart-icon">
                    <Link to="/">
                        <i className="fas fa-shopping-cart"></i> Cart
                    </Link>
                </div>
            }

        </header>
    )
}

export default Header;