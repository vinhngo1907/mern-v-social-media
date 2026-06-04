import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LeftSideBar from "../../components/global/LeftSideBar";
import RightSideBar from "../../components/global/RightSideBar";
import CreateGroupModal from "../../components/group/CreateGroupModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserGroups, searchOrDiscoverGroups } from "../../redux/actions/groupAction";
import Avatar from "../../components/other/Avatar";

const Groups = () => {
    const { auth: { token },
        groups: {
            myGroups,
            discoverGroups,
            loading,
            loadingDiscover,
        }
    } = useSelector(state => state);
    const [activeTab, setActiveTab] = useState('my');// my or 'discover'
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Pagination States
    const [myPage, setMyPage] = useState(1);
    const [discoverPage, setDiscoverPage] = useState(1);
    // const [hasMoreMy, setHasMoreMy] = useState(true);
    // const [hasMoreDiscover, setHasMoreDiscover] = useState(true);

    const dispatch = useDispatch();
    const limit = 12; // item per page

    // Load My Groups
    useEffect(() => {
        if (token) {
            dispatch(getUserGroups({ token, page: 1, limit }));
            setMyPage(1);
        }
    }, [dispatch, token]);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         dispatch(searchOrDiscoverGroups({ searchTerm, page: 1, limit }));
    //         setDiscoverPage(1);
    //     }, 500);

    //     return () => clearTimeout(timeout)
    // }, [searchTerm, dispatch, activeTab])

    // Load Discover Groups when tab or search changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(searchOrDiscoverGroups({ searchTerm, page: 1, token, limit }));
            setDiscoverPage(1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchTerm, activeTab, dispatch, token]);

    const displayedGroups = activeTab === 'my' ? myGroups : discoverGroups;
    const isLoading = activeTab === 'my' ? loading : loadingDiscover;
    // const currentPage = activeTab === 'my' ? myPage : discoverPage;
    // const hasMore = activeTab === 'my' ? hasMoreMy : hasMoreDiscover;

    // const handleLoadMore = () => {
    //     const nextPage = currentPage + 1;
    //     if (activeTab === 'my') {
    //         dispatch(getUserGroups({ token, nextPage, limit }))
    //     } else {
    //         dispatch(searchOrDiscoverGroups(searchTerm, nextPage, limit));
    //         setDiscoverPage(nextPage);
    //     }
    // }

    // Simple way to check if we should show "Load More"
    const hasMore = displayedGroups.length >= (activeTab === 'my' ? myPage : discoverPage) * limit;

    const handleLoadMore = () => {
        const nextPage = (activeTab === 'my' ? myPage : discoverPage) + 1;

        if (activeTab === 'my') {
            dispatch(getUserGroups({ token: token, page: nextPage, limit }));
            setMyPage(nextPage);
        } else {
            dispatch(searchOrDiscoverGroups({ token, searchTerm, page: nextPage, limit }));
            setDiscoverPage(nextPage);
        }
    };
    return (
        <div className="home-group row mx-auto">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar col-md-6 overlay-scrollbar scrollbar-hover">
                <div className="central-meta mt-3">
                    <div className="groups">
                        <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fa fa-users" /> joined Groups</span>
                            <button
                                className="btn btn-primary d-flex align-items-center gap-2"
                                onClick={() => setShowCreateModal(!showCreateModal)}
                            >
                                <i className="fa fa-plus mr-3 mt-1" />
                                New Group
                            </button>
                        </div>
                        {/* Search Bar */}
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search groups..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Tabs */}
                    <ul className="nav nav-tabs mb-4">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'my' ? 'active' : ''}`}
                                onClick={() => setActiveTab('my')}
                            >
                                My Groups
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'discover' ? 'active' : ''}`}
                                onClick={() => setActiveTab('discover')}
                            >
                                Discover Groups
                            </button>
                        </li>
                    </ul>
                    {/* Groups list */}
                    {/* <ul className="nearby-contct">
                        {
                            loading && <div className="spinner-border text-primary mx-auto d-block" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                        {
                            displayedGroups && displayedGroups.length > 0 ? (
                                <ul className="nearby-contct">
                                    {displayedGroups.map(group => (
                                        <li key={group._id}>
                                            <div className="nearly-pepls">
                                                <figure>
                                                    <Link to={`/group/${group._id}`}>
                                                        
                                                        <Avatar
                                                            size="large-avatar"
                                                            src={group.avatar?.url || "/default-group.jpg"}
                                                            alt={group.name}
                                                        />
                                                    </Link>
                                                </figure>
                                                <div className="pepl-info">
                                                    <h4>
                                                        <Link to={`/group/${group._id}`}>{group.name}</Link>
                                                    </h4>
                                                    <span>
                                                        {group.privacy === 'public' ? 'Public' : 'Private'} Group
                                                    </span>
                                                    <em>{group.memberCount || 0} members</em>

                                                    {activeTab === 'my' ? (
                                                        <Link to={`/groups/${group._id}`} className="add-butn">
                                                            View Group
                                                        </Link>
                                                    ) : (
                                                        <button className="add-butn">Join Group</button>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-5 text-muted">
                                    {activeTab === 'my'
                                        ? "You haven't joined any groups yet."
                                        : "No groups found."}
                                </div>
                            )
                        }
                    </ul>
                    <div className="lodmore"><button className="btn-view btn-load-more"></button></div> */}
                    {isLoading && (activeTab === 'my' ? myPage : discoverPage) === 1 ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status" />
                        </div>
                    ) : displayedGroups?.length > 0 ? (
                        <>
                            <ul className="nearby-contct">
                                {displayedGroups.map(group => (
                                    <li key={group._id}>
                                        <div className="nearly-pepls">
                                            <figure>
                                                <Link to={`/group/${group._id}`}>
                                                    <Avatar size="large-avatar" src={group.avatar?.url || "/default-group.jpg"} />
                                                </Link>
                                            </figure>
                                            <div className="pepl-info">
                                                <h4><Link to={`/group/${group._id}`}>{group.name}</Link></h4>
                                                <span>
                                                    {group.privacy === 'public' ? 'Public' : 'Private'} • {group.type}
                                                </span>
                                                <em>{group.memberCount || 0} members</em>

                                                {activeTab === 'my' ? (
                                                    <Link to={`/group/${group._id}`} className="add-butn">View Group</Link>
                                                ) : (
                                                    <button className="add-butn">Join Group</button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Load More Button */}
                            {hasMore && (
                                <div className="lodmore text-center mt-4">
                                    <button
                                        className="btn btn-light btn-load-more"
                                        onClick={handleLoadMore}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Loading...' : 'Load More'}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-5 text-muted">
                            {activeTab === 'my'
                                ? "You haven't joined any groups yet."
                                : searchTerm
                                    ? "No groups found."
                                    : "No groups available."}
                        </div>
                    )}
                </div>
            </div>
            <div className="right_sidebar col-md-3">
                <RightSideBar />
            </div>
            {/* Create Group Modal */}
            <CreateGroupModal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
            />
        </div>
    )
}

export default Groups;