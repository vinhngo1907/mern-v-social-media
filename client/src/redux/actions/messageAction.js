import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const MESSAGE_TYPES = {
    GET_MESS: "GET_MESSAGES",
    CREATE_MESS: "CREATE_MESSAGES",
    ADD_USER: "ADD_USER",
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE'
}

export const getConversations = ({ auth, socket, page = 1 }) => async (dispatch) => {
    try {

    } catch (error) {

    }
}

export const getMessages = ({ auth, id, socket, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataApi(`message/${id}`, auth.token)
    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const createMessage = ({ auth, id, socket }) => async (dispatch) => {
    try {

    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}