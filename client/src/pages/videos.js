import React from "react";
// import Avatar from "../components/other/Avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { removeNotify, NOTIFY_TYPES } from "../redux/actions/notifyAction";
// import moment from "moment";
import LeftSideBar from "../components/global/LeftSideBar";

const Videos = () => {
    return (
        <div className="home row mx-0 ">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-8">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title">Explore Videos</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videos;