import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const STATISTIC_TYPES = {
    LOADING: 'LOADING_STATISTIC',
    GET_STASTS: 'GET_STATISTICS',
    UPDATE_STATS: 'UPDATE_STATISTICS'
}


export const getAllStatistics = ({id, type, auth }) => async (dispatch) => {
    try {
        const res = await getDataApi(`statistic?type=${type}`, auth.token);
        dispatch({ type: STATISTIC_TYPES.UPDATE_STATS, payload: res.data.results });
    } catch (err) {
        console.log(err)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
    }
}

export const getTotalStatistics = (token) => async (dispatch) => {
    try {
        dispatch({ type: STATISTIC_TYPES.LOADING, payload: true });
        const res = await getDataApi("statistic", token);
        console.log(res.data);
        
        dispatch({ type: STATISTIC_TYPES.LOADING, payload: false });
        dispatch({ type: STATISTIC_TYPES.GET_STASTS, payload: res.data.results });
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } })
    }
}