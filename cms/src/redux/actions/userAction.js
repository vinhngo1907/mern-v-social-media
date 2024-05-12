import ACTIONS from "./index";
import axios from "axios";

export const fetAllUsers = async (token) => {
	const res = await axios.get('/user/get-all', {
		headers: { Authorization: `Bearer ${token}` }
	});
	return res;
}

export const dispatchGetAllUsers = (res) => {
	return {
		type: ACTIONS.GET_ALL_USERS,
		payload: res.data
	}
}