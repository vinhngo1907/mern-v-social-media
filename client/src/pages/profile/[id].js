import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileAction";
import Info from "../../components/profile/Info";
import Saved from "../../components/profile/Saved";
import Posts from "../../components/profile/Posts";
import LeftSideBar from "../../components/global/LeftSideBar";
import { fetchStatistics } from "../../redux/actions/statisticAction";

const Profile = () => {
    const { auth, profile, socket } = useSelector(state => state);

    const dispatch = useDispatch();
    const { id } = useParams();
    const [saveTab, setSaveTab] = useState(false);

    useEffect(() => {
        if (profile.ids.every(i => i !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, profile.ids, dispatch, auth]);

    useEffect(() => {
        const fromSS = sessionStorage.getItem("visit");
        if (!fromSS) {
            const timer = setTimeout(() => {
                console.log("make api request to log visit");
                dispatch(fetchStatistics({ id, type: 'visit-pageview', auth }))
                sessionStorage.setItem("visit", 'x');
            }, 10000); // 10 sec

            return () => clearTimeout(timer);
        }else{
            const timer = setTimeout(() => {
                console.log("make api request to log count");
                dispatch(fetchStatistics({ id, type: '', auth }));
                
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [dispatch, auth, id]);

    return (
        <div className="profile row mx-0">
            <div className="left_sidebar col-md-3">
                <LeftSideBar type="profile" />
            </div>
            <div className="main_sidebar col-md-9">
                <Info auth={auth} profile={profile} dispatch={dispatch} id={id} socket={socket} />
                {
                    auth.user._id === id &&
                    <div className="profile_tab">
                        <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
                        <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
                    </div>
                }
                {
                    profile.loading
                        ? <div className="spinner-border text-primary d-block mx-auto" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <>
                            {
                                saveTab
                                    ? <Saved auth={auth} dispatch={dispatch} />
                                    : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Profile;