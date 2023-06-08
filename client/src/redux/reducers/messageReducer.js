import { MESSAGE_TYPES } from '../actions/messageAction';
// import { EditData, DeleteData } from '../actions/globalTypes';

const initialState = {
    users: [],
    data: [],
    resultUsers: 0,
    firstLoad: false,
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_TYPES.ADD_USER:
            if (state.users.every(u => u._id !== action.payload._id)) {
                return {
                    ...state,
                    users: [action.payload, ...state.users]
                }
            }
            return state;

        case MESSAGE_TYPES.GET_MESS:
            return {
                ...state,
                data: [...state.data, action.payload]
            }

        default:
            return state;
    }
}

export default messageReducer;