import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <Link to="/" className="logo position-relative">
                    <h1
                        className="navbar-brand text-uppercase p-0 m-0"
                        onClick={() => window.scrollTo({ top: 0 })}
                    >
                        V-Network
                    </h1>
                </Link>
            </nav>
        </div>
    );
};

export default Header;