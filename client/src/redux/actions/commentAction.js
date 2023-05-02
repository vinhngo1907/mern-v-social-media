import { postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { createNotify } from "./notifyAction";
import { POST_TYPES } from "./postAction"

export const CreateComment = ({ post, newComment, auth }) => async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
        const data = { ...newComment, postId: post._id, postUserId: post.user._id }
        const res = await postDataApi('comment', data, auth.token);
        // console.log(res.data.results)
        const newData = { ...res.data.results, user: auth.user }
        // console.log({ newData })
        const newPost = { ...post, comments: [...post.comments, newData] }
        // console.log({ newPost })

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });


        // Notify
        const msg = {
            id: res.data.results._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url
        }
        dispatch(createNotify({ msg, auth }))
    } catch (err) {
        console.log(err)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
    }
}

export const likeComment = ({ comment, auth }) => async (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const unLikeComment = ({ comment, post, auth }) => async (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const updateComment = ({ comment, post, auth }) => async (dispatch) => {
    try {

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}