import ACTIONS from '../actions';

const capacitiesReducer = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_CAPACITIES:
            return action.payload.results;

        case ACTIONS.CREATE_CAPACITY:
            return [...state, action.payload.newCapacity];

        case ACTIONS.UPDATE_CAPACITY:
            return state.map(c => (c._id === action.payload.updatedCapacity._id ? action.payload.updatedCapacity : c));

        case ACTIONS.DELETE_CAPACITY:
            return state.filter(c => c._id !== action.payload);

        default:
            return state;
    }
};

export default capacitiesReducer;