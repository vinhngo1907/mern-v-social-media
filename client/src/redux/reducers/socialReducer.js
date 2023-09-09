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
                data: updateDataSocial(state, action)
                // data: !state.data.some(d => d.title === action.payload.title)
                //     ? state.data.map((social) => social.title === action.payload.title ? action.payload : social)
                //     : [...state.data, action.payload]
            }
        case SOCIAL_TYPES.UPDATE_YT_STATS:
            // state.data.map((social) => social.title === action.payload.title ? action.payload : social)
            // return {
            //     ...state,
            //     data: !state.data.some(d => d.title === action.payload.title)
            //         ? [...state.data, action.payload]
            //         : state.data.map((social) => social.title === action.payload.title ? action.payload : social)
            // }
            return {
                ...state,
                data: updateDataSocial(state, action)
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


function updateDataSocial(state, action){
    if(!state.data.every(d => d.title === action.payload.title)){
        state.data.push(action.payload);
        return state.data;
    }else{
        state.data = state.data.map((social) => social.title === action.payload.title ? action.payload : social);
        return state.data
    }
}

export default socialReducer;