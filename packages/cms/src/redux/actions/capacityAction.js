// redux/actions/capacityAction.js

// import axios from "axios";
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../components/utils/apis/FetchData";
import ACTIONS from ".";

export const fetchAllCapacities = async (token) => {
    const res = await getDataAPI("/capacity", token);
    console.log("FETCH CAPACITY",{res})
    return res;
};

export const dispatchGetAllCapacities = (res) => {
    // console.log({res})
    return {
        type: ACTIONS.GET_ALL_CAPACITIES,
        payload: res.data
    }
}
export const createCapacity = (capacity, token) => async (dispatch) => {
    const res = await postDataAPI('capacity', capacity, token);
    dispatch({
        type: ACTIONS.CREATE_CAPACITY,
        payload: res.data,
    });
};

// UPDATE
export const updateCapacity = (id, capacity, token) => async (dispatch) => {
    const res = await patchDataAPI(`/capacity/${id}`, capacity, token);
    dispatch({
        type: ACTIONS.UPDATE_CAPACITY,
        payload: res.data,
    });
};

// DELETE
export const deleteCapacity = (id, token) => async (dispatch) => {
    await deleteDataAPI(`/capacity/${id}`, token);
    dispatch({
        type: ACTIONS.DELETE_CAPACITY,
        payload: id,
    });
};