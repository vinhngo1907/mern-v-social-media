import { DeleteData } from '../actions/globalTypes';
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

        case MESSAGE_TYPES.GET_MESSAGES:
            return {
                ...state,
                data: [...state.data, action.payload]
            }

        case MESSAGE_TYPES.GET_CONVERSATIONS:
            return {
                ...state,
                users: action.payload.newCV,
                resultUsers: action.payload.result,
                firstLoad: true
            }

        case MESSAGE_TYPES.CREATE_MESSAGE:
            return {
                ...state,
                data: state.data.map(mess =>
                    mess._id === action.payload.recipient || mess._id === action.payload.sender
                        ? {
                            ...mess,
                            messages: [...mess.messages, action.payload],
                            result: mess.result + 1,
                        }
                        : mess
                ),
                user: state.users.map(u =>
                    u._id === action.payload.sender || u._id === action.payload.recipient
                        ? {
                            ...u,
                            text: action.payload.text,
                            media: action.payload.media,
                            call: action.payload.call
                        }
                        : u
                )
            }

        case MESSAGE_TYPES.CHECK_ONLINE_OFFLINE:
            return {
                ...state,
                users: state.users.map(u =>
                    action.payload.includes(u._id)
                        ? { ...u, online: true }
                        : { ...u, online: false }
                )
            }

        case MESSAGE_TYPES.DELETE_CV:
            return {
                ...state,
                users: DeleteData(state.users, action.payload),
                data: DeleteData(state.data, action.payload)
            }

        case MESSAGE_TYPES.DELETE_MESSAGE:
            return {
                ...state,
                data: state.data.map(
                    (mess) => mess._id === action.payload._id
                    ? {...mess, messages: action.payload.newData}
                    : mess
                )
            }

        default:
            return state;
    }
}

export default messageReducer;