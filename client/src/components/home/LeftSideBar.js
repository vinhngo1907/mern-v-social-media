import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    // useLocation
} from 'react-router-dom';
import UserCard from '../other/UserCard';
import { getSuggestion } from '../../redux/actions/suggestionAction';
import FollowBtn from '../other/FollowBtn';

const LeftSideBar = ({ type }) => {
    const { auth, suggestion } = useSelector(state => state);
    // const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navLink = [
        { path: "/", icon: "fas fa-clipboard", content: "News feed" },
        { path: "inbox.html", icon: "fas fa-mouse", content: "Inbox" },
        { path: "/groups", icon: "fas fa-users", content: "Groups" },
        { path: "images.html", icon: "fas fa-image", content: "Images" },
        { path: "timeline-videos.html", icon: "fas fa-video", content: "Videos" },
        { path: "/message", icon: "fas fa-comments", content: "Messages" },
        { path: "/notifications", icon: "fas fa-bell", content: "Notifications" },
        { path: "timeline-videos.html", icon: "fas fa-share", content: "People nearby" },
        { path: "timeline-videos.html", icon: "fas fa-power-off", content: "Logout" },
    ]
    return (
        <div className='sidebar static'>
            <div className='widget mt-3'>
                <h4 className="widget-title">Shortcuts</h4>
                <ul className="sidebar-nav overlay-scrollbar scrollbar-hover">
                    {
                        navLink.map((item, index) => (
                            <li className='sidebar-nav-item' key={index}>
                                <Link className='sidebar-nav-link' to={item.path} title={item.content}>
                                    <div><i className={item.icon} /></div>
                                    <span>{item.content}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="widget mt-3">
                <h4 className="widget-title">Socials</h4>
                <ul className="socials overlay-scrollbar scrollbar-hover px-3">
                    <li className="facebook">
                        <a title="facebook" href="#">
                            <i className="fa fa-facebook" /> <span>facebook</span> <ins>45 likes</ins>
                        </a>
                    </li>
                    <li className="twitter">
                        <a title="twitter" href="#"><i className="fa fa-twitter" /> <span>twitter</span><ins>25 likes</ins></a>
                    </li>
                    <li className="google">
                        <a title="google" href="#"><i className="fa fa-google" /> <span>google</span><ins>35 likes</ins></a>
                    </li>
                </ul>
            </div>
            <div className='widget mt-3'>
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
                            : <div className="suggestions px-2">
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

export default LeftSideBar;