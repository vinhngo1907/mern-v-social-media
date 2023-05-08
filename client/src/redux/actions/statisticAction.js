import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const STATISTIC_TYPES = {
    LOADING: 'LOADING_STATISTIC',
    GET_STASTS: 'GET_STATISTICS',
    UPDATE_STATS: 'UPDATE_STATISTICS'
}


export const getAllStatistics = ({ type, token }) => async (dispatch) => {
    try {
        dispatch({ type: STATISTIC_TYPES.LOADING, payload: true });
        const res = await getDataApi(`statistic?type=${type}`, token);
        console.log(res.data)
        dispatch({ type: STATISTIC_TYPES.GET_STASTS, payload: res.data.results });
        sessionStorage.setItem("visit", "x");
        dispatch({ type: STATISTIC_TYPES.LOADING, payload: false })
    } catch (err) {
        console.log(err)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
    }
}