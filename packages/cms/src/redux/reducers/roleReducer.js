import ACTIONS from '../actions';

const initialState = {
    roles: [],
    total: 0
};

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_ROLES:
            return {
                ...state,
                roles: action.payload.results.roles,
                total: action.payload.results.result
            };
        default:
            return state;
    }
};

export default rolesReducer;