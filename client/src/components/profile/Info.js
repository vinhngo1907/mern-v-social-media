import React, { useState } from "react";
import Avatar from "../../components/other/Avatar";

const Info = ({ auth, id, dispatch, profile }) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    return (
        <div className="info">
            {
                userData.map((user, index) => (
                    <div className="info_container" key={user._id}>
                         <Avatar src={user.avatar} size="supper-avatar" />
                    </div>
                ))
            }
        </div>
    )
}

export default Info;