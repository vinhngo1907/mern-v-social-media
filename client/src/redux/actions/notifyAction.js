import { getDataApi, postDataApi } from "../../utils/fetchData";
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
        dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err })
    }
}

export const createNotify = ({ msg, auth }) => async (dispatch) => {
    try {
        await postDataApi('notify', msg, auth.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err })
    }
}
export const removeNotify = ({ msg, auth }) => async (dispatch) => {
    try {
    
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err })
    }
}

export const isReadNotify = ({ msg, auth }) => async (dispatch) => {
    try {
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: err?.response?.data?.message || err })
    }
}