import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const VIDEOS_TYPES = {
    LOADING: 'LOADING_VIDEOS',
    GET_VIDEOS: 'GET_VIDEOS',
    UPDATE_VIDEOS: 'UPDATE_DISCOVER_VIDEOS',
    LIKE_VIDEO: 'LIKE_VIDEO',
    DISLIKE_VIDEO: 'DISLIKE_VIDEO',
    SET_PLAYER: 'SET_PLAYER',
    SET_USER_EMAIL: "SET_USER_EMAIL",
    UPDATE_TRACKS: "UPDATE_TRACKS",
    PLAYING_VIDEO: "PLAYING_VIDEO",
    SENIOR_TRACKS: "SENIOR_TRACKS_UPDATE",
    JUNIOR_TRACKS: "JUNIOR_TRACKS_UPDATE",
    OTHER_TRACKS: "OTHER_TRACKS_UPDATE"
}

export const getDiscoverVideos = (token) => async (dispatch) => {
    try {
        dispatch({ type: VIDEOS_TYPES.LOADING, payload: true });

        const res = await getDataApi('video', token);
        const { data: { results: { tracks, result } } } = res;

        dispatch({ type: VIDEOS_TYPES.GET_VIDEOS, payload: { videos: tracks, result } });
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

export const toggleLikeVideo = ({ id, auth, socket }) => async (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const toggleDisLikeVideo = ({ id, auth, socket }) => async (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const deleteVideo = ({ id, auth, socket }) => async (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const playingVideo = (data) => async (dispatch) => {
    try {
        dispatch({ type: VIDEOS_TYPES.SET_PLAYER, payload: data, })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}

export const updateTracks = (data) => async (dispatch) => {
    try {
        dispatch({ type: VIDEOS_TYPES.UPDATE_TRACKS, payload: data })
    } catch (err) {
        // dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err?.response.data.message || err } });
    }
};