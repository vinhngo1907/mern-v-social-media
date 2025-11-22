import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <a className="navbar-brand" href="/">V-Transaction</a>

            <div className="ml-auto d-flex align-items-center">
                {user && (
                    <>
                        <span className="text-white mr-3">
                            <i className="fas fa-user-circle mr-1"></i> {user.email}
                        </span>
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt mr-1"></i> Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;