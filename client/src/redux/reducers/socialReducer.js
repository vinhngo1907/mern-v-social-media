import { SOCIAL_TYPES } from "../actions/socialAction";

const initalState = {
    data: [],
    loading: false
}

const socialReducer = (state = initalState, action) => {
    switch (action.type) {
        case SOCIAL_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case SOCIAL_TYPES.GET_SOCIAL_STATS:
            return {
                ...state,
                data: action.payload
            }
        case SOCIAL_TYPES.UPDATE_GITHUB_STATS:
            return {
                ...state,
                data: state.data.map((social) => social.title === action.payload.title ? action.payload : social)
            }
        case SOCIAL_TYPES.UPDATE_YT_STATS:
            return {
                ...state,
                data: state.data.map((social) => social.title === action.payload.title ? action.payload : social)
            }
        case SOCIAL_TYPES.UPDATE_SOCIAL_STATS:
            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }
}

export default socialReducer;