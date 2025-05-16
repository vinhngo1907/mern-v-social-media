import ACTIONS from "../actions"
const initialState = {
	user:[],
	isLogged: false,
	isAdmin: false
}
const authReducer = (state = initialState, action) => {
	// const {
	// 	type,
	// 	payload: { isAuthenticated, user }
	// } = action

	switch (action.type) {
		case ACTIONS.LOGIN:
			return {
				...state,
				isLogged: true
			}
		case ACTIONS.GET_USER:
			console.log({action})
			return{
				...state,
				user: action.payload.user,
				isAdmin: action.payload.user.isAdmin
			}
		default:
			return state
	}
}

export default authReducer;