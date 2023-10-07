import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const VIDEOS_TYPES = {
    LOADING: 'LOADING_VIDEOS',
    GET_VIDEOS: 'GET_VIDEOS',
    UPDATE_VIDEO: 'UPDATE_DISCOVER_VIDEO',
    UPDATE_VIDEOS: 'UPDATE_DISCOVER_VIDEOS',
    LIKE_VIDEO: 'LIKE_VIDEO',
    DISLIKE_VIDEO: 'DISLIKE_VIDEO',
    SET_PLAYER: 'SET_PLAYER',
    LOAD_VIDEO: 'LOAD_VIDEO',
    SET_USER_EMAIL: "SET_USER_EMAIL",
    UPDATE_TRACKS: "UPDATE_TRACKS",
    PLAYING_VIDEO: "PLAYING_VIDEO",
}

export const getDiscoverVideos = (token) => async (dispatch) => {
    try {
        dispatch({ type: VIDEOS_TYPES.LOADING, payload: true });
        const res = await getDataApi('video', token);
        const { data: { results: { videos, result } } } = res;
        dispatch({ type: VIDEOS_TYPES.GET_VIDEOS, payload: { videos, result } });
        dispatch({ type: VIDEOS_TYPES.LOADING, payload: false });
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

export const deleteVideo = ({ id, auth, socket }) => (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const playingVideo = (data) => (dispatch) => {
    try {
        dispatch({ type: VIDEOS_TYPES.PLAYING_VIDEO, payload: data, })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const updateTracks = (tracks) => (dispatch) => {
    try {
        dispatch({ type: VIDEOS_TYPES.UPDATE_TRACKS, payload: tracks, })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
};
