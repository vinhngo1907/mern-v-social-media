import ACTIONS from '../actions';

const initialState = {
    loading: false,
    roles: [],
    total: 0,
    page: 2
};

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_ROLES:
            return {
                ...state,
                roles: action.payload.results.roles,
                total: action.payload.results.result,
                loading: false
            };
        case "LOADING_POST":
            return {
                ...state,
                loading: action.payload
            }
        case ACTIONS.CREATE_ROLE:
            return {
                ...state,
                roles: [action.payload, ...state.roles]
            }
        default:
            return state;
    }
};

export default rolesReducer;