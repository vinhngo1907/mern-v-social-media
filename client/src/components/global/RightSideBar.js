import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
import UserCard from "../other/UserCard";
import Visits from '../statistic/Visits';
import Views from '../statistic/Views';
import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import ChatBox from '../chat/ChatBox';
// import { getAllStatistics } from '../../redux/actions/statisticAction';

const RightSideBar = () => {
    const { auth, notify, statistic, message } = useSelector(state => state);
    const dispatch = useDispatch();
    const [visitTab, setVisitTab] = useState(false);
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loadSearch, setLoadSearch] = useState(false);

    useEffect(() => {
        if (auth.user.following) {
            setUsers(auth.user.following);
        }
    }, [auth.user.following])

    const handleClose = () => {
        setSearch('');
        setSearchUsers([]);
        setUsers(auth.user.following);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return setSearchUsers([])
        try {
            setLoadSearch(true);
            const res = await getDataApi(`user/search?name=${search}`, auth.token);
            setSearchUsers(res.data.results);
            setLoadSearch(false);
        } catch (error) {
            console.log(error);
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message || error } });
        }
    }

    const [selectedUser, setSelectedUser] = useState(null);
    const handleUserClick = (user) => {
        setSelectedUser(user);
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
                        <Link to={`profile/${auth.user._id}`}
                            style={{ fontWeight: "600", color: "#088DCD" }}
                            title="" className="underline">My page</Link>
                        <span>
                            <i className="fas fa-comment" />
                            <Link to="/message" title="messages" style={{ color: "#545454" }}>Messages <em>{message.data.length}</em></Link>
                        </span>
                        <span>
                            <i className="fas fa-bell" />
                            <Link to="/notifications" title="notifications" style={{ color: "#545454" }}>Notifications <em>{notify.data.length}</em></Link>
                        </span>
                    </div>
                    <div className="page-likes">
                        <ul className="nav nav-tabs likes-btn">

                            <li className="nav-item" onClick={() => setVisitTab(false)}>
                                <Link className={visitTab ? '' : 'active show'} to="#" data-toggle="tab" type='button'>views</Link>
                            </li>
                            <li className="nav-item" onClick={() => setVisitTab(true)}>
                                <Link className={visitTab ? 'active show' : ''} to="#" data-toggle="tab" type='button'>Visitors</Link>
                            </li>

                        </ul>
                        {/* <!-- Tab panes --> */}
                        <div className="tab-content">
                            {
                                statistic.loading
                                    ? <div className='spinner-border d-block mx-auto' role='status'>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    visitTab ? <Visits /> : <Views />
                            }


                        </div>
                    </div>
                </div>
            </div>
            <div className="widget mt-3">
                <h4 className="widget-title">Who's Following</h4>
                <div className="searchDir">
                    <form className="search_form" onSubmit={handleSearch}>
                        <input className="filterinput" type="text" placeholder="Search Contacts..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                            {/* <span className="material-icons">search</span> */}
                            {/* <span>Enter to Search</span> */}
                        </div>
                        {
                            loadSearch
                                ? <div className="spinner-border position-absolute mt-2"
                                    style={{ width: '20px', height: "20px", right: "15px" }}
                                    role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : <div className="close_search" onClick={handleClose}
                                    style={{ opacity: searchUsers.length === 0 ? 0 : 1 }}
                                >
                                    <i className='fas fa-times-circle' />
                                </div>
                        }


                        <button type="submit" style={{ display: 'none' }}>Search</button>

                    </form>
                </div>
                {
                    <ul className='overlay-scrollbar scrollbar-hover px-3 my-2'>
                        {
                            auth.user.loading
                                ? <div className="spinner-border d-block mx-auto my-2" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : <div className="following">
                                    {
                                        loadSearch ?
                                            <div className="spinner-border d-block mx-auto my-2" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            : searchUsers.length >= 1
                                                ? searchUsers.map((user, index) => (
                                                    <UserCard key={user ? user._id : index} user={user} type="home" handleUserClick={handleUserClick} />
                                                ))
                                                : users.map((user, index) => (
                                                    <UserCard key={user ? user._id : index} user={user} type="home" handleUserClick={handleUserClick} />
                                                ))
                                    }
                                </div>
                        }
                        {selectedUser && <ChatBox selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>}
                    </ul>
                }

            </div >
        </div >
    )
}

export default RightSideBar;