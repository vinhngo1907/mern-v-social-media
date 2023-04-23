import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileAction";
import Info from "../../components/profile/Info";
import Saved from "../../components/profile/Saved";
import Posts from "../../components/profile/Posts";

const Profile = () => {
    const { auth, profile } = useSelector(state => state);

    const dispatch = useDispatch();
    const { id } = useParams();
    const [saveTab, setSavedTab] = useState(false);

    useEffect(() => {
        if (profile.ids.every(i => i !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, profile.ids, dispatch, auth]);

    return (
        <div className="profile">
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {
                profile.loading
                    ? <div className="spinner-border text-primary d-block" role="status">
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
    )
}

export default Profile;