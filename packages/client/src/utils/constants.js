export const BASE_URL =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5002'
		: 'https://sleepy-inlet-56101.herokuapp.com/api'

export const LOCAL_STORAGE_TOKEN_NAME = 'firstLogin'