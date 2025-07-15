import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Close from '../../assets/close.svg';
import Menu from '../../assets/menu.svg';
import logoutIcon from "../../assets/logout.svg";

function Header() {
    const auth = useSelector(state => state.auth);
    const { user, isLogged = false, isAdmin = false } = auth;
    const token = useSelector(state => state.token);
    const [menu, setMenu] = useState(false);

    const styleMenu = {
        left: menu ? 0 : '-100%',

    };

    const adminLinks = [
        { path: '/users', label: 'Manage Users' },
        { path: '/roles', label: 'Manage roles' },
        // { path: '/posts', label: 'Manage Posts' },
        // { path: '/comments', label: 'Manage Comments' },
        // { path: '/reports', label: 'Reports' },
        // { path: '/settings', label: 'Site Settings' },
    ];

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem('firstLogin');
            window.location.href = '/';
        } catch {
            window.location.href = '/';
        }
    };

    return (
        <header className="header bg-light">
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="menu" width="30" />
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin Dashboard' : 'V-Net✮CMS'}</Link>
                </h1>

                <div>
                    <ul className="navbar-nav" style={styleMenu}>
                        {!isLogged && (
                            <li className="nav-item">
                                <Link to="/login">
                                    <i className="fas fa-user" /> Login ✥ Register
                                </Link>
                            </li>
                        )}

                        {isLogged && (
                            <li className="nav-item dropdown" style={{ opacity: 1 }}>
                                <span
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {user?.avatar && (
                                        <img
                                            src={user.avatar}
                                            alt="avatar"
                                            className="rounded-circle me-2"
                                            width="32"
                                            height="32"
                                        />
                                    )}
                                    {user?.username}
                                </span>

                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            Profile
                                        </Link>
                                    </li>

                                    {isAdmin &&
                                        adminLinks.map(link => (
                                            <li key={link.path}>
                                                <Link className="dropdown-item" to={link.path}>
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li className='nav-item'>
                                        
                                        <button onClick={handleLogout} className="dropdown-item">
                                           <img src={`${logoutIcon}`} alt="logout" style={{
                                            background: "red"
                                           }}/> Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}

                        <li className="nav-item" onClick={() => setMenu(false)}>
                            <img src={Close} alt="close" width="30" className="menu" />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;