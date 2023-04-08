import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from "../other/Avatar";
import { Link } from "react-router-dom";

const RightSideBar = () => {
    const { auth } = useSelector(state => state);

    return (
        <div className='widget mt-3'>
            <h4 className="widget-title">Your page</h4>
            <div className="your-page">
                <figure>
                    <Link to={`/profile/${auth.user._id}`} title="">
                        <Avatar size="big-avatar" src={auth.user.avatar} />
                    </Link>
                </figure>
                <div className="page-meta">
                    <Link to="#" title="" className="underline">My page</Link>
                    <span><i className="fas fa-comment"></i><Link to="insight.html" title="">Messages <em>9</em></Link> </span>
                    <span><i className="fas fa-bell"></i><Link to="insight.html" title="">Notifications <em>2</em></Link> </span>
                </div>
                <div className="page-likes">
                    <ul className="nav nav-tabs likes-btn">
                        <li className="nav-item"><Link className="active" to="#link1" data-toggle="tab">likes</Link> </li>
                        <li className="nav-item"><Link className="" to="#link2" data-toggle="tab">views</Link> </li>
                    </ul>
                    {/* <!-- Tab panes --> */}
                    <div className="tab-content">
                        <div className="tab-pane active fade show" id="link1">
                            <span><i className="fas fa-heart"></i>884</span>
                            <Link to="#" title="weekly-likes">35 new likes this week</Link>
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
                        {/* <div className="tab-pane fade" id="link2">
                            <span><i className="ti-eye"></i>440</span>
                            <Link to="#" title="weekly-likes">440 new views this week</Link> 
                            <div className="users-thumb-list">
                                <Link to="#" title="" data-toggle="tooltip" data-original-title="Anderw">
                                    <img src="images/resources/userlist-1.jpg" alt=""/>
                                </Link> 
                                <Link to="#" title="" data-toggle="tooltip" data-original-title="frank">
                                    <img src="images/resources/userlist-2.jpg" alt=""/>
                                </Link> 
                                <Link to="#" title="" data-toggle="tooltip" data-original-title="Sara">
                                    <img src="images/resources/userlist-3.jpg" alt=""/>
                                </Link> 
                                <Link to="#" title="" data-toggle="tooltip" data-original-title="Amy">
                                    <img src="images/resources/userlist-4.jpg" alt=""/>
                                </Link> 
                                <Link to="#" title="" data-toggle="tooltip" data-original-title="Ema">
                                    <img src="images/resources/userlist-5.jpg" alt=""/>
                                </Link> 
                                <Link to="#" title="" data-toggle="tooltip" data-original-title="Sophie">
                                    <img src="images/resources/userlist-6.jpg" alt=""/>
                                </Link> 
                                <Link to="#" title="" data-toggle="tooltip" data-original-title="Maria">
                                    <img src="images/resources/userlist-7.jpg" alt=""/>
                                </Link> 
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSideBar;