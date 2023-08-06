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

        case STATISTIC_TYPES.GET_STATS:
            return {
                ...state,
                visitCount: action.payload.visitCount,
                viewCount: action.payload.viewCount,
                loading: false,
                clients: action.payload.clients
            };
            
            case STATISTIC_TYPES.UPDATE_STATS:
                const { payload: { viewCount, visitCount } } = action;
                return {
                    ...state,
                    visitCount,
                    viewCount,
                    loading: false,
                    clients: action.payload.clients
            }

        default:
            return state;
    }
}

export default statisticReducer;