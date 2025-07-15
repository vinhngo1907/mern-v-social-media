import ACTIONS from "./index";
import { getDataAPI } from "../../components/utils/apis/FetchData";

export const fetchAllRoles = async (token) => {
    const res = await getDataAPI('/role', token);
    console.log({res})
    return res;
}

export const dispatchGetAllRoles = (res) => {
    return {
        type: ACTIONS.GET_ALL_ROLES,
        payload: res.data
    }
}