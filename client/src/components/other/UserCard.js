import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/other/Avatar";

const UserCard = ({ children, user, border, type }) => {
    const handleCloseAll = () => {

    }
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                    className="d-flex align-items-center user_card">
                    <Avatar src={user.avatar} size={type === "suggest" ? 'large-avatar' : 'big-avatar'} />
                    <div className="ml-1" style={{ transform: 'translateY(-2px)' }}>
                        <span className="d-block">{user.username}</span>
                        <small style={{ opacity: 0.7 }}>
                            {user.fullname}
                        </small>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default UserCard;