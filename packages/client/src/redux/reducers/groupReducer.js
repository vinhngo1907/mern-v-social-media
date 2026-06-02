import { GROUP_TYPES } from '../actions/groupAction';

const initialState = {
    groups: [],           // User's joined groups (for Groups page)
    myGroups: [],
    group: null,          // Current group detail (for GroupDetail page)
    loading: false,
    error: null,
    page: 2,
    result: 0

};

const groupReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GROUP_TYPES.LOADING_GROUP:
            return {
                ...state,
                loading: payload
            };

        case GROUP_TYPES.GET_ALL_GROUPS:
            return {
                ...state,
                groups: payload.groups,
                result: payload.result,
                loading: false
            }
        // Get User's Groups (My Groups Page)
        case GROUP_TYPES.GET_USER_GROUPS:
            return {
                ...state,
                myGroups: payload,
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

        default:
            return state;
    }
};

export default groupReducer;