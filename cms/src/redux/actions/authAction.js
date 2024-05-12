import ACTIONS from "./index";
import axios from "axios";
import { postDataAPI } from "../../components/utils/apis/FetchData";

export const dispatchLogin =  () => {
	return {
		type: ACTIONS.LOGIN
	};
}

export const fetchUser = async (token) => {
	const res = await axios.get('/api/user/me', {
		withCredentials: true,
		headers: { Authorization: `Bearer ${token}` }
	});
	return res;
}

export const dispatchGetUser = (res) => {
	return {
		type: ACTIONS.GET_USER,
		payload: {
			user: res.data.results,
			isAdmin: res.data.results.role === 'admin' ? true : false
		}
	}
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if(firstLogin){       
        try {
            const res = await postDataAPI('auth/refresh-token');
			console.log(res.data);
			dispatch({ type: ACTIONS.GET_TOKEN, payload: res.data.results.access_token });

        } catch (err) {
			console.log(err.response.data.message);
        }
    }
}
