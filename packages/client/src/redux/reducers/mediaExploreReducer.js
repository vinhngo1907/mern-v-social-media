const { DISCOVER_IMAGES_TYPES } = require("../actions/discoverAction");

const initialState = {
    images: [],
    loading: false,
    firstLoad: false,
    page: 2,
    result: 9,
    nextPageCursor: null
}

const mediaExploreReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISCOVER_IMAGES_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case DISCOVER_IMAGES_TYPES.GET_IMAGES:
            return {
                ...state,
                images: action.payload.medias,
                result: action.payload.result,
                nextPageCursor: action.payload.nextPageCursor,
                firstLoad: true
            }
        case DISCOVER_IMAGES_TYPES.UPDATE_IMAGE:
            return{
                ...state,
                images: action.payload.medias,
                result: action.payload.result,
                page: state.page + 1,
                nextPageCursor: action.payload.nextPageCursor
            }
        default:
            return state;
    }
}

export default mediaExploreReducer;