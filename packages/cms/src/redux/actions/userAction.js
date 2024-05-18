import ACTIONS from "./index";
import { getDataAPI, postDataAPI } from "../../components/utils/apis/FetchData";


export const fetAllUsers = async (token) => {
	const res = await getDataAPI('/user', token);
	return res;
}

export const dispatchGetAllUsers = (res) => {
	return {
		type: ACTIONS.GET_ALL_USERS,
		payload: res.data
	}
}