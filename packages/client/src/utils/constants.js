export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5001'
		: 'https://mern-v-chat-app.onrender.com'

export const socketUrl =
	process.env.NODE_ENV !== "production"
		? "http://localhost:5001"
		: "https://mern-v-chat-app.onrender.com"

export const BASE_URL = process.env.NODE_ENV !== "production"
	? "http://localhost:5002"
	: "https://mern-v-social-media.netlify.app";

export const LOCAL_STORAGE_TOKEN_NAME = 'firstLogin'