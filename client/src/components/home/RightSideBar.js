import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import UserCard from "../other/UserCard";

import Likes from './Likes';
import Views from './Views';

const RightSideBar = () => {
    const { auth } = useSelector(state => state);
    // const dispatch = useDispatch();
    const [likeTab, setLikeTab] = useState(false);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = (e)=>{
        e.preventDefault();
    }
    const handleClose = (e)=>{

    }
    return (
        <div className='sidebar static'>
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
            <div className="widget mt-3">
                <h4 className="widget-title">Who's Following</h4>
                <div className="searchDir">
                    <form className="search_form" onSubmit={handleSearch}>
                        <input className="filterinput" type="text" placeholder="Search Contacts..." />
                        <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                            {/* <span className="material-icons">search</span> */}
                            {/* <span>Enter to Search</span> */}
                        </div>

                        <div className="close_search" onClick={handleClose}
                            style={{ opacity: users.length === 0 ? 0 : 1 }} 
                            >
                            <i className='fas fa-times-circle'/>
                        </div>

                        <button type="submit" style={{ display: 'none' }}>Search</button>

                    </form>
                </div>
                {
                    <ul className='following overlay-scrollbar scrollbar-hover px-2'>
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
                                            <UserCard key={user._id} user={user} type="home" />
                                        ))
                                    }
                                </div>
                        }
                    </ul>
                }

            </div>
        </div>
    )
}

export default RightSideBar;