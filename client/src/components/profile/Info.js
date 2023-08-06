import React, { useEffect, useState } from "react";
import Avatar from "../../components/other/Avatar";
import FollowBtn from "../other/FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import EditProfile from "./EditProfile";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { STATISTIC_TYPES } from "../../redux/actions/statisticAction";
import { getDataApi } from "../../utils/fetchData";

const Info = ({ auth, id, dispatch, profile }) => {
    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false)

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
        if (auth.user._id === id) {
            setUserData([auth.user]);
        } else {
            const user = profile.users.filter(u => u._id === id);
            setUserData(user);
        }
    }, [auth.user, id, profile.users, dispatch]);


    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true })
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false })
        }
    }, [showFollowers, showFollowing, onEdit, dispatch]);

    useEffect(() => {
        const handleFetchStats = async () => {
            if (userData && userData.length >= 1) {
                // console.log({ userData });
                const firstStats = sessionStorage.getItem("visit");
                if (firstStats == null) {
                    // dispatch(fetchStatistics({ id: userData[0]._id, type: 'visit-pageview', auth }));
                    const res = await getDataApi(`statistic/fetch?type=visit-pageview&id=${userData[0]._id}`, auth.token);
                    dispatch({ type: STATISTIC_TYPES.GET_STATS, payload: res.data.results });
                } else {
                    // dispatch(fetchStatistics({ id: userData[0]._id, type: 'pageview', auth }));
                    const res = await getDataApi(`statistic/fetch?id=${userData[0]._id}`, auth.token);
                    dispatch({ type: STATISTIC_TYPES.UPDATE_STATS, payload: res.data.results });
                }
                sessionStorage.setItem("visit", "x");
            }
        }
        return () => handleFetchStats();
    }, [dispatch, id, auth, userData]);

    return (
        <div className="info">
            {
                userData.map((user, index) => (
                    <div className="info_container" key={user._id}>
                        <Avatar src={user.avatar} size="super-avatar" />
                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{user.username}</h2>
                                {
                                    user._id === auth.user._id
                                        ? <button className="btn btn-outline-info"
                                            onClick={() => setOnEdit(true)}>
                                            Edit Profile
                                        </button>
                                        : <FollowBtn user={user} />
                                }


                            </div>

                            <div className="follow_btn">
                                <span className="mr-4" onClick={() => setShowFollowers(true)}>
                                    {user.followers.length} Followers
                                </span>
                                <span className="ml-4" onClick={() => setShowFollowing(true)}>
                                    {user.following.length} Following
                                </span>
                            </div>

                            <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                            <p className="m-0">{user.address}</p>
                            <h6 className="m-0">{user.email}</h6>
                            <a href={user.website} target="_blank" rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                        </div>
                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }

                        {
                            showFollowers &&
                            <Followers
                                users={user.followers}
                                setShowFollowers={setShowFollowers}
                            />
                        }
                        {
                            showFollowing &&
                            <Following
                                users={user.following}
                                setShowFollowing={setShowFollowing}
                            />
                        }
                    </div>

                ))
            }
        </div>
    )
}

export default Info;