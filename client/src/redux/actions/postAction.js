import { deleteDataApi, getDataApi, patchDataApi, postDataApi, putDataApi } from "../../utils/fetchData";
import { imageDestroy, imageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";
import { createNotify, removeNotify } from "./notifyAction";

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
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
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

        // Notify
        const msg = {
            id: res.data.results._id,
            text: 'added a new post.',
            recipients: res.data.results.user.followers,
            url: `/post/${res.data.results._id}`,
            content,
            image: media[0].url
        }

        dispatch(createNotify({ msg, auth }))
    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const editPost = ({ content, images, auth, status }) => async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter(img => !img.url);
    const imgOldUrl = images.filter(img => img.url);
    if (status.content === content && imgNewUrl === 0 && imgOldUrl === status.images.length) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl, auth.token);

        const res = await putDataApi(`post/${status._id}`, {
            content, images: [...imgOldUrl, ...media]
        }, auth.token);

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.results })
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } });
    } catch (err) {
        console.log(err);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const deletePost = ({ post, auth }) => async (dispatch) => {
    try {
        if (post.images.length > 0) {
            post.images.forEach(img => {
                imageDestroy(img, auth.token)
            });
        }

        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

        const res = await deleteDataApi(`post/${post._id}`, auth.token);

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } });

        // Notify
        const msg = {
            id: post._id,
            text: 'deleted a post',
            recipients: res.data.results.user.followers,
            url: `/post/${post._id}`,
        }

        dispatch(removeNotify({ msg, auth }))
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
    }
}

export const likePost = ({ post, auth }) => async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] }
    try {

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        await patchDataApi(`post/${post._id}/like`, null, auth.token);

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url
        }

        dispatch(createNotify({ msg, auth }))
    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
    }
}

export const unLikePost = ({ post, auth }) => async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter(l => l._id !== auth.user._id) }
    try {
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        await patchDataApi(`post/${post._id}/unlike`, null, auth.token);

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({ msg, auth }))
    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
    }
}

export const getPost = ({ postDetail, id, auth }) => async (dispatch) => {

    if (postDetail.every(p => p._id !== id)) {
        try {
            const res = await getDataApi(`post/${id}`, auth.token);
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.results })
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
        }
    }
}

export const savePost = ({ post, auth }) => async (dispatch) => {
    dispatch({
        type: GLOBALTYPES.AUTH, payload: {
            ...auth,
            user: {
                ...auth.user,
                saved: [...auth.user.saved, post._id]
            }
        }
    });
    try {
        await patchDataApi(`post/${post._id}/save`, null, auth.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
    }
}

export const unSavePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await patchDataApi(`post/${post._id}/unsave`, null, auth.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
    }
}