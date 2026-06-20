import { EditData } from "../actions/globalTypes";
import { GROUP_TYPES } from "../actions/groupAction";


const initialState = {
    group: null,
    joinRequests: [],
    loading: false,
    loadingRequests: false,
    error: null
};

const groupDetailReducer = (state = [], action) => {
    switch (action.type) {
        case GROUP_TYPES.GET_GROUP_DETAIL:
            return [...state, action.payload]

        // Update group when admin edits it
        case GROUP_TYPES.UPDATE_GROUP:
            // return {
            //     ...state,
            //     group: action.payload,
            //     loading: false
            // };

            return EditData(state, action.payload._id);

        // ==================== JOIN REQUESTS ====================
        case GROUP_TYPES.LOADING_JOIN_REQUESTS:
            return {
                ...state,
                loadingRequests: action.payload
            };

        case GROUP_TYPES.GET_JOIN_REQUESTS:
            return {
                ...state,
                joinRequests: action.payload,
                loadingRequests: false
            };

        case GROUP_TYPES.REVIEW_JOIN_REQUEST:
            // Update join requests list after approve/reject
            return {
                ...state,
                joinRequests: state.joinRequests.filter(req => req._id !== action.payload.requestId),
                group: state.group ? {
                    ...state.group,
                    memberCount: action.payload.newMemberCount || state.group.memberCount
                } : null,
                loadingRequests: false
            };

        default:
            return state;
    }
};

export default groupDetailReducer;