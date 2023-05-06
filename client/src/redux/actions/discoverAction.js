import { getDataApi } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"

export const DISCOVER_TYPES = {
    LOADING: 'LOADING_DISCOVER',
    GET_POSTS: 'GET_DISCOVER_POSTS',
    UPDATE_POST: 'UPDATE_DISCOVER_POST'
}

export const getDiscoverPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: DISCOVER_TYPES.LOADING, payload: true })
        
        const res = await getDataApi('post/discover', token);
        dispatch({ type: DISCOVER_TYPES.GET_POSTS, payload: res.data.results });
        dispatch({ type: DISCOVER_TYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
    }
}