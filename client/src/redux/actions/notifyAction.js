import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export const getAllNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataApi('notify', token);
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.results })
    } catch (err) {
         dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err });
    }
}

export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {
    try {
        const res = await postDataApi('notify', msg, auth.token);
        socket.emit('createNotify', {
            ...res.data.results,
            user:{
                _id: auth.user._id,
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        });
    } catch (err) {
         dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err });
    }
}

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {
    try {
        await deleteDataApi(`notify/${msg.id}?url=${msg.url}`, auth.token);
        socket.emit('removeNotify', msg);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err });
    }
}

export const isReadNotify = ({ msg, auth }) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: { ...msg, isRead: true } });
        await patchDataApi(`notify/${msg._id}`, null, auth.token);
    } catch (err) {
         dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err });
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: [] });
    try {
        await deleteDataApi('notify', token);
    } catch (err) {
         dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err });
    }
}