import { STATISTIC_TYPES } from "../actions/statisticAction";

const initialState = {
    visitCount: 0,
    viewCount: 0,
    clients: [],
    loading: false
}

const statisticReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATISTIC_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case STATISTIC_TYPES.GET_STASTS:

            return {
                ...state,
                visitCount: action.payload.visitCount,
                viewCount: action.payload.viewCount,
                clients: [...state.clients, action.payload.clients]
            };

        default:
            return state;
    }
}

export default statisticReducer;