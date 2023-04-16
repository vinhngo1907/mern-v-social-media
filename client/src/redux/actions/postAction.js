import { getDataApi, postDataApi } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}

export const getAllPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
        const res = await getDataApi('post', token);

        dispatch({ type: POST_TYPES.GET_POSTS, payload: { posts: res.data.results.posts, result: res.data.results.result } })
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
        console.log(err.response);
        // dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const createPost = ({ images, content, auth }) => async (dispatch) => {
    let media;
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (images.length > 0) media = await imageUpload(images, auth.token);

        const res = await postDataApi('post', { content, images: media }, auth.token);

        dispatch({ type: POST_TYPES.CREATE_POST, payload: { ...res.data.results, user: auth.user } });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
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