import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";

const Likes = ({ auth }) => {
    return (
        <div className="tab-pane active fade show" id="link1">
            <span><i className="fas fa-heart"></i>884</span>
            <Link to="#" title="weekly-likes">35 new visits this week</Link>
            <div className="users-thumb-list">
                <Link to="#" title="" data-toggle="tooltip" data-original-title="Anderw">
                    <Avatar src={auth.user.avatar} size="small-avatar" />
                </Link>
                <Link to="#" title="" data-toggle="tooltip" data-original-title="frank">
                    <Avatar src={auth.user.avatar} size="small-avatar" />
                </Link>
                <Link to="#" title="" data-toggle="tooltip" data-original-title="Sara">
                    <Avatar src={auth.user.avatar} size="small-avatar" />
                </Link>
                <Link to="#" title="" data-toggle="tooltip" data-original-title="Amy">
                    <Avatar src={auth.user.avatar} size="small-avatar" />
                </Link>
                <Link to="#" title="" data-toggle="tooltip" data-original-title="Ema">
                    <Avatar src={auth.user.avatar} size="small-avatar" />
                </Link>
                <Link to="#" title="" data-toggle="tooltip" data-original-title="Sophie">
                    <Avatar src={auth.user.avatar} size="small-avatar" />
                </Link>
                <Link to="#" title="" data-toggle="tooltip" data-original-title="Maria">
                    <Avatar src={auth.user.avatar} size="small-avatar" />

                </Link>
            </div>
        </div>
    )
}

export default Likes