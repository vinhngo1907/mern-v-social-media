import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";

const Views = ({ auth }) => {
    return (
        <div className="tab-pane fade active show" id="link2">
            <span><i className="fas fa-eye"/>440</span>
            <Link to="#" title="weekly-likes">440 new views this week</Link>
            <div className="users-thumb-list">
                <Link to="#" title={auth.user.username} data-toggle="tooltip" data-original-title={auth.user.username}>
                    <Avatar src={auth.user.avatar} size="large-avatar" />
                </Link>
            </div>
        </div>
    )
}

export default Views;