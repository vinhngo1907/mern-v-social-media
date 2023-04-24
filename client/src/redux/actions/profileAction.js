import { getDataApi, patchDataApi, putDataApi } from "../../utils/fetchData"
import { imageUpload } from "../../utils/imageUpload"
import { DeleteData, GLOBALTYPES } from "./globalTypes"

export const PROFILE_TYPES = {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}

export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id })
    try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true })
        const res = await getDataApi(`user/${id}`, auth.token);
        // console.log(res.data); 
        const users = res.data

        const resPosts = await getDataApi(`post/user/${id}`, auth.token);
        console.log(resPosts.data);
        const postsData = resPosts.data;

        dispatch({ type: PROFILE_TYPES.GET_USER, payload: { user: users.results } });
        dispatch({ type: PROFILE_TYPES.GET_POSTS, payload: { ...postsData.results, _id: id, page: 2 } });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const updateProfile = ({ avatar, profileData, auth }) => async (dispatch) => {
    if (!profileData.fullname)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your full name." } })

    if (profileData.fullname.length > 25)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your full name too long." } })

    if (profileData.story.length > 200)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your story too long." } })

    let media = null;
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        if (avatar) media = await imageUpload([avatar], auth.token);
        
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...profileData,
                    avatar: avatar ? media[0].url : auth.user.avatar
                }
            }
        });
        const res = await putDataApi('user', { ...profileData, avatar: avatar ? media[0].url : auth.user.avatar }, auth.token)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const follow = ({ users, user, auth }) => async (dispatch) => {
    let newUser = null;
    if (users.every(u => u._id !== user._id)) {
        newUser = { ...user, followers: [...user.followers, auth.user] }
    } else {
        users.forEach(item => {
            if (item._id === user._id) {
                newUser = { ...item, followers: [...item.followers, auth.user] }
            }
        })
    }

    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

    dispatch({
        type: GLOBALTYPES.AUTH, payload: {
            ...auth,
            user: { ...auth.user, following: [...auth.user.following, newUser] }
        }
    })
    try {
        await patchDataApi(`user/${user._id}/follow`, null, auth.token);

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const unFollow = ({ users, user, auth }) => async (dispatch) => {
    let newUser = null;
    if (users.every(u => u._id !== user._id)) {
        newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) };
    } else {
        users.forEach(u => {
            if (u._id === user._id) {
                newUser = { ...u, followers: DeleteData(u.followers, auth.user._id) };
            }
        })
    }
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });
    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth,
            user: { ...auth.user, following: DeleteData(auth.user.following, newUser._id) }
        }
    })
    try {
        await patchDataApi(`user/${user._id}/unfollow`, null, auth.token);

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}