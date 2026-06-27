// components/body/admin/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/userAction';
import pencilIcon from "../../../assets/pencil.svg";
import trashIcon from "../../../assets/trash.svg";

const UserManagement = () => {
    const { auth, token, users } = useSelector(state => state);
    const { isAdmin } = auth;
    
    const dispatch = useDispatch();
    const [callback, setCallback] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAdmin && token) {
            setLoading(true);
            fetchAllUsers(token)
                .then(res => {
                    dispatch(dispatchGetAllUsers(res));
                })
                .finally(() => setLoading(false));
        }
    }, [token, isAdmin, dispatch, callback]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                setLoading(true);
                // Use your existing API function
                // await postDataAPI(`admin/user/${id}`, null, token);
                console.log("User deleted:", id);
                setCallback(!callback);
            } catch (error) {
                alert(error?.response?.data?.message || "Failed to delete user");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>User Management</h4>
                <button className="btn btn-primary">+ Add New User</button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email / Login</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center">Loading users...</td></tr>
                        ) : users && users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.fullname || user.name}</td>
                                    <td>
                                        {user.email || user.mobile || "N/A"}
                                    </td>
                                    <td>
                                        {user.roles && user.roles.length > 0
                                            ? user.roles.map(role => role.name).join(', ')
                                            : 'No Role'
                                        }
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        {user.isActive ? (
                                            <span className="badge bg-success">Active</span>
                                        ) : (
                                            <span className="badge bg-danger">Inactive</span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/edit_user/${user._id}`} className="btn btn-sm btn-outline-primary mx-1">
                                            <img src={pencilIcon} alt="edit" width="16" />
                                        </Link>
                                        <button 
                                            className="btn btn-sm btn-outline-danger mx-1"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            <img src={trashIcon} alt="delete" width="16" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;