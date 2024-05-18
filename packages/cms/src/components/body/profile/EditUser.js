import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { showErrMsg, showSuccessMsg } from "../../utils/notifications/Notification";

const EditUser = () => {
    const { id } = useParams();
    const history = useHistory();
    const [editUser, setEditUser] = useState([]);
    const { users, auth, token } = useSelector(state => state);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [num, setNum] = useState(0)


    useEffect(() => {
        if (users.length !== 0) {
            users.forEach(user => {
                if (user._id === id) {
                    setEditUser(user);
                    setCheckAdmin(user.role === 1 ? true : false);
                }
            });
        } else {
            history.push("/profile");
        }
    }, [users, id, history]);

    const handleCheck = () => {
        setSuccess('');
        setErr('');
        setCheckAdmin(!checkAdmin);
        setNum(num + 1)
    }
    return (
        <div className="profile_page edit_user">
            <div className="row"></div>
            <div className="col-left">
                <h2>Edit User</h2>
                <div className="form-group">
                    <input type="checkbox" id="isAdmin" checked={checkAdmin}
                        onChange={handleCheck} />
                    <label htmlFor="isAdmin">isAdmin</label>
                </div>

                {/* <button onClick={handleUpdate}>Update</button> */}
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>
        </div>
    );
}

export default EditUser;