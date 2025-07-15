import ACTIONS from "./index";
import { getDataAPI } from "../../components/utils/apis/FetchData";

export const fetchAllUsers = async (token) => {
	const res = await getDataAPI('/admin/user/list', token);
	console.log({res})
	return res;
}

export const dispatchGetAllUsers = (res) => {
	return {
		type: ACTIONS.GET_ALL_USERS,
		payload: res.data
	}
}