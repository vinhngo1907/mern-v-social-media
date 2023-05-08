import React  from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";

const Views = ({auth, statisitc}) => {

    return (
        <div className="tab-pane fade active show" id="link2">
        <span><i className="fas fa-eye" />{statisitc?.viewCount}</span>
        <Link to="#" title="weekly-likes">{statisitc?.viewCount} new views this week</Link>
        <div className="users-thumb-list">
            <Link to="#" title={auth.user.username} data-toggle="tooltip" data-original-title={auth.user.username}>
                <Avatar src={auth.user.avatar} size="large-avatar" />
            </Link>
        </div>
    </div>
    )
}

export default Views;