import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from '../../redux/actions/profileAction';

const FollowBtn = ({ user }) => {
    const { auth, profile } = useSelector(state => state);
    const [followed, setFollowed] = useState(false);
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        if (auth.user.following.find(u => u._id === user._id)) {
            setFollowed(true);
        }
        return () => setFollowed(false)
    }, [auth.user.following, user._id]);

    const handleFollow = () => {
        if (load) return;

        setFollowed(true)
        setLoad(true)
        dispatch(follow({ users: profile.users, user, auth }));
        setLoad(false);
    }

    const handleUnFollow = () => {
        if (load) return;

        setFollowed(false)
        setLoad(true)
        dispatch(unFollow({ users: profile.users, user, auth }));
        setLoad(false);
    }
    return (
        <>
            {
                followed
                    ? <button
                        className="btn btn-outline-danger"
                        onClick={handleUnFollow}>
                        UnFollow
                    </button>
                    : <button className="btn btn-outline-info"
                        onClick={handleFollow}>
                        Follow
                    </button>
            }
        </>
    )
}

export default FollowBtn;