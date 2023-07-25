import { deleteDataApi, getDataApi, postDataApi } from "../../utils/fetchData";
import { imageDestroy } from "../../utils/imageUpload";
import { DeleteData, GLOBALTYPES } from "./globalTypes";

export const MESSAGE_TYPES = {
    GET_MESSAGES: "GET_MESSAGES",
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    CREATE_MESSAGE: "CREATE_MESSAGES",
    ADD_USER: "ADD_USER",
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE',
    DELETE_MESSAGE: "DELETE_MESSAGE",
    EDIT_MESSAGE: "EDIT_MESSAGE",
    DELETE_CV: "DELETE_CV",
}

export const getConversations = ({ page = 1, auth }) => async (dispatch) => {
    try {
        const res = await getDataApi(`conversation?limit=${page * 9}`, auth.token);
        let newCV = [];
        res.data.results.forEach(item => {
            item.recipients.forEach(cv => {
                if (cv._id !== auth.user._id) {
                    newCV.push({ ...cv, text: item.text, media: item.media, call: item.call })
                }
            })
        });

        dispatch({
            type: MESSAGE_TYPES.GET_CONVERSATIONS,
            payload: {
                newCV,
                result: res.data.results.length,
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const getMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataApi(`message/${id}`, auth.token);
        const newMess = { messages: res.data.results.reverse(), result: res.data.results.length }
        dispatch({ type: MESSAGE_TYPES.GET_MESSAGES, payload: { ...newMess, _id: id, page } })
    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const loadMoreMessages = ({ auth, id, page = 1 }) => async (dispatch) => {
    try {
        const res = await getDataApi(`message/${id}`, auth.token);
        const newMess = { messages: res.data.results, result: res.data.results.length }
        dispatch({ type: MESSAGE_TYPES.GET_MESSAGES, payload: { ...newMess, _id: id, page } })
    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const createMessage = ({ auth, msg, socket }) => async (dispatch) => {
    dispatch({ type: MESSAGE_TYPES.CREATE_MESSAGE, payload: msg });

    const { _id, avatar, fullname, username } = auth.user;
    socket.emit('addMessage', { ...msg, user: { _id, avatar, fullname, username } });

    try {
        await postDataApi(`message`, msg, auth.token);

    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const deleteConversation = ({ auth, id }) => async (dispatch) => {
    dispatch({ type: MESSAGE_TYPES.DELETE_CV, payload: id });
    try {
        await deleteDataApi(`conversation/${id}`, auth.token);
    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const deleteMessage = ({ msg, data, auth, socket }) => async (dispatch) => {
    if (msg.media && msg.media.length > 0) {
        msg.media.forEach((img) => {
            imageDestroy(img, auth.token)
        })
    }
    const newData = DeleteData(data, msg._id);
    dispatch({
        type: MESSAGE_TYPES.DELETE_MESSAGE, 
        payload: {
            newData,
            _id: msg.recipient
        }
    });
    try {
        await deleteDataApi(`message/${msg._id}`, auth.token);
    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const editMessage = ({ msg, data, auth }) => async (dispatch) => {
    try {

    } catch (error) {
        console.log(error);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}