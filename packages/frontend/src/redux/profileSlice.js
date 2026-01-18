import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataAPI, patchDataAPI, putDataAPI } from "../utils/apis/FetchData";
import { deleteData, editData, GLOBALTYPES } from "./globalTypes";
import { createNotify, removeNotify } from "./notifySlice";
import { validateUpdateProfile } from "../utils/validation/valid";
import { imageUpload } from "../utils/upload";

export const getProfileUsers = createAsyncThunk(
    'profile/getProfileUsers',
    async ({ id, auth }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setProfileId(id));
            dispatch(setLoading(true));
            const resUser = await getDataAPI(`user/${id}`, auth.token);
            const resPosts = await getDataAPI(`post/user/${id}`, auth.token);
            dispatch(setProfileUser(resUser.data.results));
            dispatch(setProfileUser({
                ...resPosts.data.results,
                _id: id,
                page: 2
            }));

            dispatch(setLoading(false));
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response?.data?.message }
            })
            return rejectWithValue(error.response?.data?.message || error);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async ({ avatar, profileData, auth }, { dispatch, rejectWithValue }) => {
        const error = validateUpdateProfile(profileData);
        if (error.errLength !== 0) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: error.errMsg });
            rejectWithValue(error.errMsg);
        }

        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

            let media;
            if (avatar) media = await imageUpload([avatar], auth.token);

            const newUser = {
                ...auth.user,
                ...profileData,
                avatar: avatar ? media[0].url : auth.user.avatar
            }

            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: { ...auth, user: { ...newUser } }
            });

            const res = await putDataAPI(
                'user',
                { ...profileData, avatar: newUser.avatar },
                auth.token
            );
            
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.message },
            })
            return rejectWithValue(err.response.data.message)
        }
    }
)

export const followUser = createAsyncThunk(
    'profile/followUser',
    async ({ user, auth, users, socket }, { dispatch, rejectWithValue }) => {
        let newUser;
        if (users.every(u => u._id !== user._id)) {
            newUser = { ...user, followers: [...user.followers, auth.user] }
        } else {
            users.forEach(u => {
                if (u._id === user._id) {
                    newUser = { ...u, followers: [...u.followers, auth.user] }
                }
            })
        }

        dispatch(follow(newUser));
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: { ...auth.user, following: [...auth.user.following, newUser] }
            }
        })
        const res = await patchDataAPI(`user/follow/${id}`, null, auth.token);
        socket.emit('follow', res.data.results)

        const msg = {
            id: auth.user._id,
            text: 'have followed you',
            recipients: [newUser._id],
            url: `/profile/${auth.user._id}`,
        }

        dispatch(createNotify({ msg, auth, socket }))
    }
);

export const unFollowUser = createAsyncThunk(
    'profile/unFollowUser',
    async ({ user, users, auth, socket }, { dispatch }) => {
        let newUser;
        if (users.every(u => u._id !== user._id)) {
            newUser = { ...user, followers: deleteData(user.followers, auth.user._id) }
        } else {
            users.forEach(u => {
                if (u._id === user._id) {
                    newUser = { ...u, followers: deleteData(u.followers, auth.user._id) }
                }
            })
        }

        dispatch(follow(newUser));
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: { ...auth.user, following: deleteData(auth.user.following, newUser) }
            }
        })
        const res = await patchDataAPI(`user/unfollow/${id}`, null, auth.token);
        socket.emit('unFollow', res.data.results)

        const msg = {
            id: auth.user._id,
            text: 'hast started to unfollow you',
            recipients: [newUser._id],
            url: `/profile/${auth.user._id}`,
        }

        dispatch(removeNotify({ msg, auth, socket }))
    }
)

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        loading: false,
        ids: [],
        users: [],
        posts: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setProfileId: (state, action) => {
            state.ids = [...state.ids, action.payload]
        },
        setProfileUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        setProfilePosts: (state, action) => {
            state.posts.push(action.payload);
        },
        follow: (state, action) => {
            state.users = editData(state.users, action.payload._id, action.payload);
        },
        unFollow: (state, action) => {
            state.users = editData(state.users, action.payload._id, action.payload);
        },
        updateProfilePost: (state, action) => {
            state.posts = editData(state.posts, action.payload._id, action.payload)
        }
    }
});

export const {
    setLoading,
    setProfileId,
    setProfileUser,
    setProfilePosts,
    follow,
    unFollow,
    updateProfilePost,
} = profileSlice.actions

export default profileSlice.reducer