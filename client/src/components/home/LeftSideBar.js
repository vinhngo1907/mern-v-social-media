import React from 'react';
import { Link } from 'react-router-dom';

const LeftSideBar = () => {

    return (
        <div className='widget mt-3'>
            <h4 className="widget-title">Shortcuts</h4>
            <ul className="sidebar-nav">
                <li className='sidebar-nav-item'>
                    <Link className='sidebar-nav-link' to="newsfeed.html" title="">
                        <div><i className="fas fa-clipboard" /></div>
                        <span>News feed</span>
                    </Link>
                </li>
                <li className='sidebar-nav-item'>

                    <Link className='sidebar-nav-link' to="inbox.html" title="">
                        <div><i className="fas fa-mouse" /></div>
                        <span>Inbox</span>
                    </Link>
                </li>
                <li className='sidebar-nav-item'>

                    <Link className='sidebar-nav-link' to="timeline-friends.html" title="">
                        <div><i className="fas fa-users" /></div>
                        <span>Friends</span>
                    </Link>
                </li>
                <li className='sidebar-nav-item'>
                    <Link className='sidebar-nav-link' to="timeline-photos.html" title="">
                        <div><i className="fas fa-image" /></div>
                        <span>images</span>
                    </Link>
                </li>
                <li className='sidebar-nav-item'>

                    <Link className='sidebar-nav-link' to="timeline-videos.html" title="">
                        <div><i className="fas fa-video" /></div>
                        <span>Videos</span>
                    </Link>
                </li>
                <li className='sidebar-nav-item'>

                    <Link className='sidebar-nav-link' to="messages.html" title="">
                        <div><i className="fas fa-comments" /></div>
                        <span>Messages</span>
                    </Link>
                </li>
                <li className='sidebar-nav-item'>

                    <Link className='sidebar-nav-link' to="notifications.html" title="">
                        <div><i className="fas fa-bell" /></div>
                        <span>Notifications</span>
                    </Link>
                </li>
                <li className='sidebar-nav-item'>

                    <Link className='sidebar-nav-link' to="people-nearby.html" title="">
                        <div><i className="fas fa-share" /></div>
                        <span>People Nearby</span>
                    </Link>
                </li>
                {/* <li className='sidebar-nav-item'>
                    <i className="fas fa-chart" />
                    <Link className='sidebar-nav-link' to="insights.html" title="">insights</Link>
                </li> */}
                <li className='sidebar-nav-item'>
                    <Link className='sidebar-nav-link' to="landing.html" title="">
                        <div><i className="fas fa-power-off" /></div>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default LeftSideBar;