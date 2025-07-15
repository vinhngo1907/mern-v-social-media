import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessMsg, showErrMsg } from '../../utils/notifications/Notification';
import { fetchAllUsers, dispatchGetAllUsers } from '../../../redux/actions/userAction';
import axios from "axios";
import moment from "moment"
import { postDataAPI } from "../../utils/apis/FetchData";
import pencilIcon from "../../../assets/pencil.svg";
import trashIcon from "../../../assets/trash.svg";
// import editIcon from "../../../assets/edit.svg";

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

            const file = e.target.files[0];
            if (!file) return setData({ ...data, err: "No files were upload.", success: "" });
            const { type, size } = file
            if (size > 1024 * 1024) return setData({ ...data, err: "File is too large.", success: "" });
            if (type !== "image/jpeg" || type !== "image/png")
                return setData({ ...data, success: "", err: "File format is not correct" });

            let formData = new FormData();
            formData.append('file', file);
            setLoading(true);

            const res = await axios.patch(`api/users/${auth.user._id}`, {
                Headers: {
                    'content-type': "multipart/form-data", Authorization: auth?.user?.token
                }
            })

            setLoading(false);

            setAvatar(res.data.url)
            setData({ ...res.data.user, success: res.data?.message });
        } catch (error) {
            setData({
                ...data, success: "",
                err: error?.response?.data?.message || "Something wrong when change avatar!!!"
            })
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

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are your sure?")) {
                setLoading(true);
                await postDataAPI(`admin/user/${id}`, null, auth?.user?.token)
                setLoading(false);
                setCallback(!callback);
            }
        } catch (error) {
            setData({
                ...data, success: "",
                err: error?.response?.data?.message || "Something wrong when delete user!!!"
            });
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
                                    <th>Login</th>
                                    <th>Role</th>
                                    <th>Due date</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.type === "email"
                                                ? user.email
                                                : user.type === "sms"
                                                    ? user.mobile
                                                    : user.type === "google"
                                                        ? user.email
                                                        : user.type === "facebook"
                                                            ? user.email : user.mobile
                                            }
                                            </td>
                                            <td>
                                               {
                                                        user.roles && user.roles.length > 0
                                                            ? user.roles.map(role => role.name).join(', ')
                                                            : 'No Role'
                                                    }
                                            </td>
                                            <td>{moment(user?.createdAt).fromNow()}</td>
                                            <td className="text-center"
                                            >{
                                                user.isActive
                                                    ? (<i className="fas fa-check-circle text-success" title="Active"/>)
                                                    : (<i className="fas fa-times-circle text-danger" title="Blocked" />)
                                            }</td>
                                            <td className="text-center">
                                                <Link to={`/edit_user/${user._id}`}>
                                                    <img src={`${pencilIcon}`} alt="pencil" />
                                                </Link>

                                                <button type="button" className="my-2"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    <img src={`${trashIcon}`} alt="trash" />
                                                </button>

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