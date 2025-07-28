import axios from 'axios'

const setAuthToken = token => {
	if (token) {
		axios.defaults.withCredentials = true;
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		delete axios.defaults.headers.common['Authorization'];
		delete axios.defaults.withCredentials;
	}
}

export default setAuthToken
