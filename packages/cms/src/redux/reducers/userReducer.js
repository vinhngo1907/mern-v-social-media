
import ACTIONS from '../actions';

const users = [];

const usersReducer = (state = users, action) => {
    console.log({action})
    switch (action.type) {
        case ACTIONS.GET_ALL_USERS:
            return action.payload.results;
        default:
            return state;
    }
}

export default usersReducer