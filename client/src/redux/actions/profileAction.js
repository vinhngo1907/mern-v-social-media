import { getDataApi, patchDataApi } from "../../utils/fetchData"
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

        dispatch({ type: PROFILE_TYPES.GET_USER, payload: { user: res.data.results } });
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const updateProfile = (data) => async (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const follow = ({ users, user, auth }) => async (dispatch) => {
    try {
        const res = await patchDataApi(`user/${user._id}/follow`, null, auth.token);
        dispatch({ type: PROFILE_TYPES.FOLLOW, payload: res.data.results })
        dispatch({
            type: GLOBALTYPES.AUTH, payload: {
                user: { ...auth.user, following: [...auth.user.following, user._id] }
            }
        })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const unFollow = ({ users, user, auth }) => async (dispatch) => {
    try {
        const res = await patchDataApi(`user/${user._id}/unfollow`, null, auth.token);
        dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: res.data.results });
        const newData = DeleteData(auth.user.following, user);
        dispatch({
            type: GLOBALTYPES.AUTH, payload: {
                user: { ...auth.user, following: [...auth.user.following, ...newData] }
            }
        })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}