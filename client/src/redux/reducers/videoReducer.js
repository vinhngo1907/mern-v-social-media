const { DISCOVER_VIDEOS_TYPES } = require("../actions/discoverAction");

const initialState = {
    page: 2,
    result: 9,
    loading: false,
    data: [],
    firstLoad: false,
    currentVideo: null,
    player: null,
    videoId: '',
    startSeconds: 0,
}

const videoReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DISCOVER_VIDEOS_TYPES.LOADING:
            return {
                ...state,
                loading: payload
            }

        case DISCOVER_VIDEOS_TYPES.GET_VIDEOS:
            return {
                ...state,
                data: payload.videos,
                result: payload.result,
                firsLoad: true,
            }

        case DISCOVER_VIDEOS_TYPES.UPDATE_VIDEO:
            return {
                ...state,
                data: payload.videos,
                result: payload.result,
                page: state.page + 1
            }
            
        case DISCOVER_VIDEOS_TYPES.UPDATE_VIDEOS:
            return {
                ...state,
                data: payload.videos,
                result: payload.result,
                page: state.page + 1
            }

        case DISCOVER_VIDEOS_TYPES.LIKE_VIDEO:
            return {
                ...state,
            }

        case DISCOVER_VIDEOS_TYPES.DISLIKE_VIDEO:
            return {
                ...state
            }

        case DISCOVER_VIDEOS_TYPES.LOAD_VIDEO:
            return {
                ...state,
                videoId: action.payload.videoId,
                startSeconds: payload.startSeconds,
            }

        case DISCOVER_VIDEOS_TYPES.SET_PLAYER:
            return{
                ...state,
                player: payload
            }
        default:
            return state;
    }
}

export default videoReducer;