import { PROFILE_TYPES } from "../actions/profileAction";

const initialState = {
    loading: false,
    ids: [],
    users: [],
    posts: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_TYPES.GET_USER:
            return {
                ...state
            };

        case PROFILE_TYPES.GET_ID:
            return {
                ...state
            }
            
        default:
            return state;
    }
}

export default profileReducer;