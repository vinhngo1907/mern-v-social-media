import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessMsg, showErrMsg } from '../../utils/notifications/Notification'

const initialState = {
    name: "",
    password: "",
    cf_password: "",
    err: "",
    success: ""
}

const Profile = () => {
    const { auth, token, users } = useSelector(state => state);
    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);
    const { isAdmin = true } = auth;
    const [data, setData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: '', success: '' });
    }

    const handleChangeAvatar = async (e) => {
        e.preventDefault();
        try {

        } catch (error) {
            setData({ ...data, err: error.response.data.message, success: "" });
        }
    }

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
                            <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                        </span>
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
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;