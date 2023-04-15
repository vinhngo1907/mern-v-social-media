import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../../redux/actions/profileAction";

const Profile = () =>{
    const {auth, profile} = useSelector(state=> state);

    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        if(profile.users.every(u=>u._id !== id)){
            // dispatch({type:PROFILE_TYPES.GET_ID, payload: id})
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, profile.users, dispatch, auth])
    return (
        <>My Profile</>
    )
}

export default Profile;