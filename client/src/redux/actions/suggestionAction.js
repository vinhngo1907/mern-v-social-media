import { GLOBALTYPES } from "./globalTypes"
import { getDataApi } from "../../utils/fetchData";

export const SUGGES_TYPES = {
    LOADING: 'LOADING_SUGGES',
    GET_USERS: 'GET_USERS_SUGGES',
}

export const getSuggestion = (token) => async (dispatch) => {
    try {
        dispatch({ type: SUGGES_TYPES.LOADING, payload: { loading: true } })
        const res = await getDataApi('user/suggestion', token);
        // console.log(res.data);
        dispatch({ type: SUGGES_TYPES.GET_USERS, payload: res.data })
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message } })
    }
}