import { deleteDataApi, patchDataApi, postDataApi, putDataApi } from "../../utils/fetchData";
import { DeleteData, EditData, GLOBALTYPES } from "./globalTypes";
import { createNotify, removeNotify } from "./notifyAction";
import { POST_TYPES } from "./postAction"

export const CreateComment = ({ post, newComment, auth, socket }) => async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
        const data = { ...newComment, postId: post._id, postUserId: post.user._id }
        const res = await postDataApi('comment', data, auth.token);

        const newData = { ...res.data.results, user: auth.user }
        const newPost = { ...post, comments: [...post.comments, newData] }

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

        // Socket
        socket.emit('createComment', newPost);

        // Notify
        const msg = {
            id: res.data.results._id,
            text: newComment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
            recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
            url: `/post/${post._id}`,
            content: post.content,
            image: post.images[0].url
        }
        dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
        console.log(err)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
    }
}

export const likeComment = ({ comment, post, auth }) => async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] }
    const newPost = { ...post, comments: EditData(post.comments, comment._id, newComment) }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
        await patchDataApi(`comment/${comment._id}/like`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const unLikeComment = ({ comment, post, auth }) => async (dispatch) => {
    const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) };
    const newPost = { ...post, comments: EditData(post.comments, comment._id, newComment) };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
        await patchDataApi(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
    }
}

export const updateComment = ({ comment, post, content, auth }) => async (dispatch) => {
    const newComment = { ...comment, content: content };
    const newPost = { ...post, comments: EditData(post.comments, comment._id, newComment) };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    try {
        await putDataApi(`comment/${comment._id}`, newComment, auth.token);
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } });
    }
}

export const removeComment = ({ comment, post, auth, socket }) => async (dispatch) => {
    const deletedArr = [...post.comments.filter(cm => cm.reply === comment._id), comment]
    const newPost = {
        ...post, comments: post.comments.filter(cm => !deletedArr.find(da => cm._id === da._id))
    }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit('deleteComment', newPost)

    try {
        deletedArr.forEach(item => {
            deleteDataApi(`comment/${item._id}`, auth.token);
            // await deleteDataApi(`comment/${comment._id}`, auth.token);
            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [post.user._id],
                url: `/post/${post._id}`,
            }

            dispatch(removeNotify({ msg, auth, socket }))
        })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}