import React from 'react';
import { useSelector } from 'react-redux';
import {
    Link,
    // useLocation
} from 'react-router-dom';
import UserCard from '../other/UserCard';

const LeftSideBar = () => {
    const { auth } = useSelector(state => state);
    // const { pathname } = useLocation();
    const navLink = [
        { path: "newsfeed.html", icon: "fas fa-clipboard", content: "News feed" },
        { path: "inbox.html", icon: "fas fa-mouse", content: "Inbox" },
        { path: "timeline-friends.html", icon: "fas fa-users", content: "Friends" },
        { path: "images.html", icon: "fas fa-image", content: "Images" },
        { path: "timeline-videos.html", icon: "fas fa-video", content: "Videos" },
        { path: "timeline-videos.html", icon: "fas fa-comments", content: "Messages" },
        { path: "timeline-videos.html", icon: "fas fa-bell", content: "Notifications" },
        { path: "timeline-videos.html", icon: "fas fa-share", content: "People nearby" },
        { path: "timeline-videos.html", icon: "fas fa-power-off", content: "Logout" },
    ]
    return (
        <div className='sidebar'>
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
            <div className='widget mt-3'>
                <h4 className="widget-title">Who's Following</h4>
                <ul className='sidebar-nav overlay-scrollbar scrollbar-hover'>
                {
                    auth.user.loading
                        ? <div className='position-asolute' style={{ top: "50%", left: "50%", translate: ("50%", "50%") }}>
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : <div className="following">
                            {
                                auth?.user.following.map(user => (
                                    <UserCard key={user._id} user={user} type="home">
                                        {/* <FollowBtn user={user} /> */}
                                    </UserCard>
                                ))
                            }
                        </div>
                }
                </ul>
            </div>
        </div>
    )
}

export default LeftSideBar;