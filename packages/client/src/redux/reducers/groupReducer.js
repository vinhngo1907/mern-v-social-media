import { GROUP_TYPES } from '../actions/groupAction';

const initialState = {
    groups: [],
    discoverGroups: [],
    myGroups: [],
    loading: false,
    allPage: 0,
    allResult: 9,
    myPage: 0,
    myGroupsResult: 9,
    discoverPage: 0,
    discoverResult: 9,
    loadingDiscover: false,
};

const groupReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GROUP_TYPES.LOADING_GROUP:
            return {
                ...state,
                loading: payload,
            };

        case GROUP_TYPES.GET_ALL_GROUPS:
            return {
                ...state,
                groups: payload.page === 1
                    ? payload.groups
                    : [...state.allResult, ...action.payload.groups],
                allResult: payload.result,
                loading: false
            }
        // Get User's Groups (My Groups Page)
        case GROUP_TYPES.GET_USER_GROUPS:
            return {
                ...state,
                myGroups: payload.page === 1
                    ? payload.groups
                    : [...state.myGroups, ...action.payload.groups],
                myGroupsResult: payload.result,
                loading: false
            };

        case GROUP_TYPES.GET_DISCOVER_GROUPS:
            return {
                ...state,
                discoverGroups: payload.page === 1
                    ? payload.groups
                    : [...state.discoverGroups, ...payload.groups],
                discoverResult: payload.result,
                loading: false
            };

        // Create New Group
        case GROUP_TYPES.CREATE_GROUP:
            return {
                ...state,
                groups: [action.payload, ...state.groups],
                loading: false
            };

        default:
            return state;
    }
};

export default groupReducer;