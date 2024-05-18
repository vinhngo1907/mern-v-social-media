import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const history = useHistory();
    const [editUser, setEditUser] = useState([]);
    const {users, auth, token} = useSelector(state => state);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {

    }, [users, id ,history]);
    
    return (
        <div className="profile_page edit_user">
            <div className="row"></div>
            <div className="col-left">
                <h2>Edit User</h2>
            </div>
        </div>
    );
}

export default EditUser;