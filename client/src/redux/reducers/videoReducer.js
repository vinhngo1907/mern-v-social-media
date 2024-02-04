const { VIDEOS_TYPES } = require("../actions/videoAction");

const initialState = {
    page: 2,
    result: 9,
    loading: false,
    data: [],
    firstLoad: false,
    player: null,
    videoId: '',
    startSeconds: 0,
    user: {
        email: "", username: ""
    }
}

const videoReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case VIDEOS_TYPES.LOADING:
            return {
                ...state,
                loading: payload
            }

        case VIDEOS_TYPES.GET_VIDEOS:
            return {
                ...state,
                data: payload.videos,
                result: payload.result,
                firsLoad: true,
            }

        case VIDEOS_TYPES.UPDATE_VIDEOS:
            return {
                ...state,
                data: payload.videos,
                result: payload.result,
                page: state.page + 1
            }

        case VIDEOS_TYPES.UPDATE_TRACKS:
            // const updatedTracks = [...state.data, ...payload.tracks];
            return {
                ...state,
                data: payload.tracks,
                page: state.page + 1,
                result: payload.result
            };
        case VIDEOS_TYPES.LIKE_VIDEO:
            return {
                ...state,
            }

        case VIDEOS_TYPES.DISLIKE_VIDEO:
            return {
                ...state
            }

        case VIDEOS_TYPES.LOAD_VIDEO:
            return {
                ...state,
                videoId: action.payload.videoId,
                startSeconds: payload.startSeconds,
            }

        case VIDEOS_TYPES.SET_PLAYER:
            return {
                ...state,
                player: payload
            }

        case VIDEOS_TYPES.SET_USER_EMAIL:
            // Access the current user's email from auth state
            const userEmail = action.payload; // Or state.auth.email, depending on your authReducer structure

            // Update user-related data in the state
            return {
                ...state,
                user: {
                    ...state.user,
                    email: userEmail,
                },
            };
        default:
            return state;
    }
}

export default videoReducer;