import React from "react";
import { useParams, useHistory } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams
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