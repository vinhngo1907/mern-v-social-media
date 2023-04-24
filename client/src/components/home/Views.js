import React from "react";
import { Link } from "react-router-dom";

const Views = ({ auth }) => {
    return (
        <div className="tab-pane fade show" id="link2">
            <span><i className="ti-eye"></i>440</span>
            <Link to="#" title="weekly-likes">440 new views this week</Link>
            <div className="users-thumb-list">
                <Link to="#" title="" data-toggle="tooltip" data-original-title="Anderw">
                    <img src={auth.user.avatar} alt="avatar" />
                </Link>
            </div>
        </div>
    )
}

export default Views;