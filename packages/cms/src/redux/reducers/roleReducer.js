
import ACTIONS from '../actions';

const roles = [];

const rolesReducer = (state = roles, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_ROLES:
            return action.payload.results;
        default:
            return state;
    }
}

export default rolesReducer