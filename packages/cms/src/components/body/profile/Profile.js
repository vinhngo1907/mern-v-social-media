import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessMsg, showErrMsg } from '../../utils/notifications/Notification';
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/userAction';
import axios from "axios";

const initialState = {
    name: "",
    password: "",
    cf_password: "",
    err: "",
    success: ""
}

const Profile = () => {
    const { auth, token, users } = useSelector(state => state);
    const { user, isAdmin } = auth;
    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);
    const [data, setData] = useState(initialState);

    const { password, cf_password, err, success } = data;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: '', success: '' });
    }

    const handleChangeAvatar = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`api/users/${auth.user._id}`)
        } catch (error) {
            setData({ ...data, err: error.response.data.message, success: "" });
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res));
            });
        }
    }, [token, isAdmin, dispatch, callback]);

    return (
        <>
            <div>
                {err && showErrMsg(err.message)}
                {success && showSuccessMsg(success.message)}
                {loading && <h3>Loading...</h3>}
            </div>
            <div className="profile_page">
                <div className="col-left">
                    <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
                    <div className="avatar">
                        <img src={avatar ? avatar : auth.user.avatar} alt="" />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change</p>
                            <input type="file" name="file" id="file_up" onChange={handleChangeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" defaultValue={user.name}
                            placeholder="Your name" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue={user.email}
                            placeholder="Your email address" disabled />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" name="password" id="password"
                            placeholder="Your password" value={password} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm New Password</label>
                        <input type="password" name="cf_password" id="cf_password"
                            placeholder="Confirm password" value={cf_password} onChange={handleChange} />
                    </div>

                    <div>
                        <em style={{ color: "crimson" }}>
                            * If you update your password here, you will not be able
                            to login quickly using google and facebook.
                        </em>
                    </div>
                </div>
                <div className="col-right">
                    <h2>{isAdmin ? "Users" : "Admin"}</h2>
                    <div style={{ overflowX: "auto" }}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            <td>
                                            {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;