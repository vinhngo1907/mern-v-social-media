import { postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postAction"

export const CreateComment = ({ post, newComment, auth }) => async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
        const data = { ...newComment, postId: post._id, postUserId: post.user._id }
        const res = await postDataApi('comment', data, auth.token);

        const newData = { ...res.data.results, user: auth.user }
        const newPost = { ...post, comments: [...post.comments, newData] }

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });


        // Notify
        const msg = {
            id: res.data.newComment._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url
        }

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
} 

export const likeComment = ({comment, auth}) => async (dispatch) =>{
    try {
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const unLikeComment = ({comment, auth}) => async (dispatch) =>{
    try {
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const updateComment = ({comment, auth}) => async (dispatch) =>{
    try {
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}