import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import { useSelector } from "react-redux";

const Likes = () => {
    const { statistic } = useSelector(state => state);
    const [data, setData] = useState([]);
    const [visitCount, setVisitCount] = useState(0);
    
    useEffect(()=>{
        if(statistic.clients && statistic.clients.length >= 0){
            setData(statistic.clients);
            setVisitCount(statistic.visitCount);
        }
    },[statistic.clients, statistic.visitCount]);
    return (
        <div className="tab-pane active fade show" id="link1">
            <span><i className="fas fa-heart" />{statistic.visitCount}</span>
            <Link to="#" title="weekly-likes">{visitCount} new visits this week</Link>
            <div className="users-thumb-list">
                {
                    data.map((client) => (
                        <Link to="#" key={client._id} title={client.username}
                            data-toggle="tooltip" data-original-title={client.username}>
                            <Avatar src={client.avatar} size="large-avatar" />
                        </Link>
                    ))
                }
                {/* 
                <Link to="#" title="Frank" data-toggle="tooltip" data-original-title="frank">
                    <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1683457061/v-media/team1_lmbsvs.jpg" size="large-avatar" />
                </Link>
                <Link to="#" title="Sara" data-toggle="tooltip" data-original-title="Sara">
                    <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1656250919/v-chat-app/axpcwfgochdnukohoj56.jpg" size="large-avatar" />
                </Link>
                <Link to="#" title="Amy" data-toggle="tooltip" data-original-title="Amy">
                    <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1671982159/v-chat-app/plb8gh5lknivjinkezye.jpg" size="large-avatar" />
                </Link>
                <Link to="#" title="Ema" data-toggle="tooltip" data-original-title="Ema">
                    <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1657934274/v-media/k9vlo1bffib3e5dnkr1x.jpg" size="large-avatar" />
                </Link>
                <Link to="#" title="Sophie" data-toggle="tooltip" data-original-title="Sophie">
                    <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1661565634/v-chat-app/igtsjzz7ukdy6linnebi.jpg" size="large-avatar" />
                </Link>
                <Link to="#" title="Maria" data-toggle="tooltip" data-original-title="Maria">
                    <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1661564774/v-chat-app/lbjsdbxitqr0t4rakwiv.jpg" size="large-avatar" />
                </Link> */}
            </div>
        </div>


    )
}

export default Likes