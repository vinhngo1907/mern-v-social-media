import { DeleteData, EditData } from '../actions/globalTypes';
import { POST_TYPES } from '../actions/postAction';

const initialSatate = {
	loading: false,
	posts: [],
	page: 2,
	result: 0
}

const postReducer = (state = initialSatate, action) => {
	const { type, payload } = action
	switch (type) {
		case POST_TYPES.GET_POSTS:
			return {
				...state,
				posts: payload.posts,
				result: payload.result,
				loading: false
			}

		case POST_TYPES.LOADING_POST:
			return {
				...state,
				loading: payload
			}

		case POST_TYPES.CREATE_POST:
			return {
				...state,
				posts: [payload, ...state.posts]
			}

		case POST_TYPES.DELETE_POST:
			return {
				...state,
				// posts: state.posts.filter(post => post._id !== payload)
				posts: DeleteData(state.posts, payload._id)
			}

		case POST_TYPES.UPDATE_POST:
			return {
				...state,
				// posts: EditData(state.posts, payload._id, payload)
                posts: EditData(state.posts, action.payload._id, action.payload)
			}

		default:
			return state
	}
}
export default postReducer;