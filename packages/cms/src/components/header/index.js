// components/header/index.js
import { useState } from 'react';
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
        transition: 'all 0.3s ease'
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem('firstLogin');
        } catch (err) {
            console.error(err);
        } finally {
            window.location.href = '/';
        }
    };

    return (
        <header className="header bg-light shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    {/* Mobile Menu Button */}
                    <button 
                        className="navbar-toggler d-lg-none" 
                        type="button"
                        onClick={() => setMenu(!menu)}
                    >
                        <img src={Menu} alt="menu" width="28" />
                    </button>

                    {/* Brand */}
                    <Link className="navbar-brand fw-bold" to="/">
                        {isAdmin ? 'Admin Panel' : 'V-Net✮CMS'}
                    </Link>

                    {/* Navbar Content */}
                    <div className={`collapse navbar-collapse ${menu ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto" style={styleMenu}>
                            {!isLogged ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        <i className="fas fa-user me-1"></i> Login / Register
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <span
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
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
                                        {user?.username || user?.name}
                                    </span>

                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/profile">Profile</Link>

                                        {isAdmin && (
                                            <>
                                                <div className="dropdown-divider"></div>
                                                <Link className="dropdown-item fw-bold" to="/admin">
                                                    🛠 Admin Dashboard
                                                </Link>
                                                <Link className="dropdown-item" to="/admin/users">Manage Users</Link>
                                                <Link className="dropdown-item" to="/admin/roles">Manage Roles</Link>
                                                <Link className="dropdown-item" to="/admin/groups">Manage Groups</Link>
                                            </>
                                        )}

                                        <div className="dropdown-divider"></div>
                                        <button 
                                            onClick={handleLogout} 
                                            className="dropdown-item text-danger"
                                        >
                                            <img 
                                                src={logoutIcon} 
                                                alt="logout" 
                                                width="18" 
                                                className="me-2" 
                                            />
                                            Logout
                                        </button>
                                    </div>
                                </li>
                            )}

                            {/* Mobile Close */}
                            <li className="nav-item d-lg-none mt-2">
                                <button 
                                    className="btn btn-light" 
                                    onClick={() => setMenu(false)}
                                >
                                    <img src={Close} alt="close" width="28" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;