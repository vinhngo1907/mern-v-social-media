import { GROUP_TYPES } from '../actions/groupAction';
import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {
    groups: [],           // User's joined groups (for Groups page)
    group: null,          // Current group detail (for GroupDetail page)
    loading: false,
    error: null,
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {

        case GROUP_TYPES.LOADING_GROUP:
            return {
                ...state,
                loading: action.payload
            };

        // Get User's Groups (My Groups Page)
        case GROUP_TYPES.GET_USER_GROUPS:
            return {
                ...state,
                groups: action.payload,
                loading: false
            };

        // Get Single Group Detail
        case GROUP_TYPES.GET_GROUP_DETAIL:
            return {
                ...state,
                group: action.payload,
                loading: false
            };

        // Create New Group
        case GROUP_TYPES.CREATE_GROUP:
            return {
                ...state,
                groups: [action.payload, ...state.groups], // Add new group to top
                loading: false
            };

        // Update Group
        case GROUP_TYPES.UPDATE_GROUP:
            return {
                ...state,
                // Update in groups list if exists
                groups: state.groups.map(g =>
                    g._id === action.payload._id ? action.payload : g
                ),
                // Update current group detail
                group: state.group?._id === action.payload._id
                    ? action.payload
                    : state.group,
                loading: false
            };

        // Handle Alert Error (Global)
        case GLOBALTYPES.ALERT:
            if (action.payload.error) {
                return {
                    ...state,
                    error: action.payload.error,
                    loading: false
                };
            }
            return state;

        default:
            return state;
    }
};

export default groupReducer;