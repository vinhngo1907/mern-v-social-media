import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import UserCard from "../other/UserCard";
import { getSuggestion } from '../../redux/actions/suggestionAction';
import FollowBtn from '../other/FollowBtn';
import Likes from './Likes';
import Views from './Views';

const RightSideBar = () => {
    const { auth, suggestion } = useSelector(state => state);
    const dispatch = useDispatch();
    const [likeTab, setLikeTab] = useState(false);

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
                        <li className="nav-item" onClick={() => setLikeTab(true)}>
                                <Link className={likeTab ? 'active show' : ''} to="#" data-toggle="tab" type='button'>likes</Link>
                            </li>
                            <li className="nav-item" onClick={() => setLikeTab(false)}>
                                <Link className={likeTab ? '' : 'active show'} to="#" data-toggle="tab" type='button'>views</Link>
                            </li>
                            

                        </ul>
                        {/* <!-- Tab panes --> */}
                        <div className="tab-content">
                            {
                                likeTab
                                    ? <Likes auth={auth} />
                                    : <Views auth={auth} />
                            }

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