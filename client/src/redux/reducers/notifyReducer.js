import { DeleteData } from "../actions/globalTypes";
import { NOTIFY_TYPES } from "../actions/notifyAction";

const initialState = {
    loading: false,
    data: [],
    sound: false
}
const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data: action.payload
            }

        case NOTIFY_TYPES.CREATE_NOTIFY:
            return {
                ...state,
                data: [action.payload, ...state.data]
            };
        case NOTIFY_TYPES.UPDATE_NOTIFY:
            return {
                ...state,
                data: DeleteData(state.data, action.payload._id)
            }
        default:
            return state;
    }
}

export default notifyReducer