import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import { useSelector } from "react-redux";

const Views = () => {
    const { statistic } = useSelector(state => state);
    const [data, setData] = useState([]);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        if (statistic.clients && statistic.clients.length >= 0) {
            setData(statistic.clients);
            setViewCount(statistic.viewCount);
        }
    }, [statistic.clients, statistic.viewCount]);

    return (
        <div className="tab-pane fade active show" id="link2">
            <span><i className="fas fa-eye" />{statistic.viewCount}</span>
            <Link to="#" title="weekly-likes">{viewCount} new views this week</Link>
            <div className="users-thumb-list">
                {
                    data.map((client, index) => (
                        <Link to="#" title={client.username} key={`${client._id}-${index}`}
                            data-toggle="tooltip" data-original-title={client.username}
                        >
                            <Avatar src={client.avatar} size="large-avatar" />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Views;