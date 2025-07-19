import ACTIONS from "./index";
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../../components/utils/apis/FetchData";

export const fetchAllRoles =  async (token, page = 1, limit = 5) => {
    const res = await getDataAPI(`/role?page=${page}&limit=${limit}`, token);
    // console.log({ res })
    return res;
}

export const dispatchGetAllRoles = (res) => {
    return {
        type: ACTIONS.GET_ALL_ROLES,
        payload: res.data
    }
}

export const updateRole = (id, token, data) => async (dispatch) => {
    const res = await putDataAPI(`/role/${id}`, data, token);
    dispatch({
        type: ACTIONS.UPDATE_ROLE,
        payload: res.data,
    });
}

export const deleteRole = (id, token) => async (dispatch) => {
    await deleteDataAPI(`/role/${id}`, token);
    dispatch({
        type: ACTIONS.DELETE_ROLE,
        payload: id,
    });
}

export const createRole = (data, token) => async (dispatch) => {
    const res = await postDataAPI(`role/`, data, token);
    dispatch({
        type: ACTIONS.CREATE_ROLE,
        payload: res.data
    });
}