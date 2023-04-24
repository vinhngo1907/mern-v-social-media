import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import UserCard from "../other/UserCard";
import { getSuggestion } from '../../redux/actions/suggestionAction';
import FollowBtn from '../other/FollowBtn';

const RightSideBar = () => {
    const { auth, suggestion } = useSelector(state => state);
    const dispatch = useDispatch();


    return (
        <div className='sidebar'>
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
                                    {/* <Link to="#" title="" data-toggle="tooltip" data-original-title="Anderw">
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
                                    </Link> */}
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
            <div className='widget mt-3'>
                {/* <UserCard user={auth.user}/> */}
                <div className="d-flex justify-content-between align-items-center my-2 position-relative">
                    <h4 className="widget-title">Suggestion</h4>
                    {
                        !suggestion.loading &&
                        <i className="fas fa-redo position-absolute"
                            style={{ cursor: 'pointer', top: "30%", right: "10%" }}
                            onClick={() => dispatch(getSuggestion(auth.token))}
                        />
                    }
                </div>
                <div className='postion-relative'>
                    {
                        suggestion.loading
                            ? <div className="spinner-border d-block mx-auto" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            : <div className="suggestions">
                                {
                                    suggestion?.users.map(user => (
                                        <UserCard key={user._id} user={user} type="home">
                                            <FollowBtn user={user} />
                                        </UserCard>
                                    ))
                                }
                            </div>
                    }
                </div>
                <div style={{ opacity: 0.5, flexDirection: "column" }}
                    className="my-2 d-flex justify-content-between aligns-item-center"
                >
                    <a href="https://www.github.com/vinhngo1907" target="_blank" rel="noreferrer"
                        style={{ wordBreak: 'break-all' }} >
                        https://www.github.com/vinhngo1907
                    </a>
                    <small className="d-block">
                        Welcome to v social media "V-Network"
                    </small>

                    <small>
                        &copy; 2023 V-NETWORK FROM KOOKUU V.N VIET NAM
                    </small>
                </div>
            </div>
        </div>
    )
}

export default RightSideBar;