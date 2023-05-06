const { DISCOVER_TYPES } = require("../actions/discoverAction");

const initialState = {
    page: 2,
    result: 9,
    loading: false,
    posts: [],
    firstLoad: false
}

const discoverReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DISCOVER_TYPES.LOADING:
            return {
                ...state,
                loading: payload
            }

        case DISCOVER_TYPES.GET_POSTS:
            return {
                ...state,
                posts: payload.posts,
                result: payload.result,
                firsLoad: true,
            }

        case DISCOVER_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: payload.posts,
                result: payload.result,
                page: state.page + 1
            }
        
        default:
            return state;
    }
}

export default discoverReducer;