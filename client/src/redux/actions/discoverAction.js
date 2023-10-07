import { getDataApi } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"

export const DISCOVER_TYPES = {
    LOADING: 'LOADING_DISCOVER',
    GET_POSTS: 'GET_DISCOVER_POSTS',
    UPDATE_POST: 'UPDATE_DISCOVER_POST'
}

export const DISCOVER_IMAGES_TYPES = {
    LOADING: 'LOADING_IMAGES',
    GET_IMAGES: 'GET_DISCOVER_IMAGES',
    UPDATE_IMAGE: 'UPDATE_DISCOVER_IMAGE'
}

export const DISCOVER_VIDEOS_TYPES = {
    LOADING: 'LOADING_VIDEOS',
    GET_VIDEOS: 'GET_VIDEOS',
    UPDATE_VIDEO: 'UPDATE_DISCOVER_VIDEO',
    UPDATE_VIDEOS: 'UPDATE_DISCOVER_VIDEOS',
    LIKE_VIDEO: 'LIKE_VIDEO',
    DISLIKE_VIDEO: 'DISLIKE_VIDEO',
    SET_PLAYER: 'SET_PLAYER',
    LOAD_VIDEO: 'LOAD_VIDEO',
    SET_USER_EMAIL: "SET_USER_EMAIL"
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

export const getDiscoverImages = (token) => async (dispatch) => {
    try {
        dispatch({ type: DISCOVER_IMAGES_TYPES.LOADING, payload: true });
        const res = await getDataApi('upload/get', token);
        dispatch({ type: DISCOVER_IMAGES_TYPES.GET_IMAGES, payload: res.data.results });
        dispatch({ type: DISCOVER_IMAGES_TYPES.LOADING, payload: false });
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const getDiscoverVideos = (token) => async (dispatch) => {
    try {
        dispatch({ type: DISCOVER_VIDEOS_TYPES.LOADING, payload: true });
        const res = await getDataApi('video', token);
        const { data: { results: { videos, result } } } = res;
        dispatch({ type: DISCOVER_VIDEOS_TYPES.GET_VIDEOS, payload: { videos, result } });
        dispatch({ type: DISCOVER_VIDEOS_TYPES.LOADING, payload: false });
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const getVideoById = ({ id, token }) => async (dispatch) => {
    try {
        await getDataApi(`video/${id}`, token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const toggleLikeVideo = ({ id, token }) => (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const toggleDisLikeVideo = ({ id, token }) => (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}