import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/other/Avatar";
import { useSelector } from "react-redux";

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing, type, msg }) => {
    const { theme } = useSelector(state => state);
    const handleCloseAll = () => {
        if (handleClose) handleClose();
        if (setShowFollowers) setShowFollowers(false);
        if (setShowFollowing) setShowFollowing(false);
    }

    const showMessage = (user) => {
        return (
            <>
                <div style={{ fill: theme ? 'invert(1)' : 'invert(0)' }}>
                    {user.text}
                </div>
                {
                    user.media.length > 0 &&
                    <div>{user.media.length}<i className="fas fa-image" /></div>
                }
                {
                    user.call &&
                    <span className="material-icons">
                        {
                            user.call.times === 0
                                ? user.call.video ? 'videocam_off' : 'phone_disabled'
                                : user.call.video ? 'video_camera_front' : 'call'
                        }
                    </span>
                }
            </>
        )
    }

    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                    className={`d-flex align-items-center ${type === 'home' ? '' : 'user_card'}`}>
                    <Avatar src={user.avatar} size={type === "home" ? 'large-avatar' : 'big-avatar'} />
                    <div className="ml-3" style={{ transform: 'translateY(-2px)' }}>
                        <span className="d-block" style={{ color: "#545454" }}>{user.username}</span>
                        <small style={{ opacity: 0.7 }}>
                            {
                                msg
                                    ? showMessage(user)
                                    : user.fullname || user.username
                            }
                        </small>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default UserCard;