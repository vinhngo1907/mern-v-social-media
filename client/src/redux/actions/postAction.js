import { GLOBALTYPES } from "./globalTypes";

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}

export const createPost = (data) => async (dispatch) => {
    try {

    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const editPost = (data) => async (dispatch) => {
    try {

    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const likePost = (data) => async (dispatch) => {
    try {

    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}