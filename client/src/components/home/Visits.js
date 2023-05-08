import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";

const Likes = ({ auth, statisitc } ) => {

    return (
        // <div className="tab-pane active fade show" id="link1">
        //     <span><i className="fas fa-heart"></i>884</span>
        //     <Link to="#" title="weekly-likes">35 new visits this week</Link>
        //     <div className="users-thumb-list">
        //         <Link to="#" title="Sophie" data-toggle="tooltip" data-original-title="Sophie">
        //             <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1661565634/v-chat-app/igtsjzz7ukdy6linnebi.jpg" size="large-avatar" />
        //         </Link>
        //         <Link to="#" title="Maria" data-toggle="tooltip" data-original-title="Maria">
        //             <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1661564774/v-chat-app/lbjsdbxitqr0t4rakwiv.jpg" size="large-avatar" />
        //         </Link>
        //     </div>
        // </div>
        <>
            {
                statisitc?.loading
                    ? <div className="spinner-border text-primary d-block mx-auto" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    : <div className="tab-pane active fade show" id="link1">
                        <span><i className="fas fa-heart" />{statisitc?.viewCount}</span>
                        <Link to="#" title="weekly-likes">{statisitc?.viewCount} new visits this week</Link>
                        <div className="users-thumb-list">
                            <Link to="#" title={auth.user.username} data-toggle="tooltip" data-original-title={auth.user.username}>
                                <Avatar src={auth.user.avatar} size="large-avatar" />
                            </Link>
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
                            </Link>
                        </div>
                    </div>
            }
        </>

    )
}

export default Likes