import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import { useSelector } from "react-redux";
// import { getAllStatistics } from "../../redux/actions/statisticAction";

const Views = ({ auth, dispatch }) => {
    const { statistic } = useSelector(state => state);

    // useEffect(() => {
    //     dispatch(getAllStatistics({ type: 'pageview', token: auth.token }));
    // }, [auth.token, dispatch]);

    return (
        <div className="tab-pane fade active show" id="link2">
            <span><i className="fas fa-eye" />{statistic.viewCount}</span>
            <Link to="#" title="weekly-likes">440 new views this week</Link>
            <div className="users-thumb-list">
                <Link to="#" title={auth.user.username} data-toggle="tooltip" data-original-title={auth.user.username}>
                    <Avatar src={auth.user.avatar} size="large-avatar" />
                </Link>
                <Link to="#" title={auth.user.username} data-toggle="tooltip" data-original-title={auth.user.username}>
                    <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1683390295/v-media/u12iobqaqukvxtty73qn.jpg" size="large-avatar" />
                </Link>
            </div>
        </div>
    )
}

export default Views;