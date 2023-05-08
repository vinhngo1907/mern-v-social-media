import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes"

export const STATISTIC_TYPES = {
    LOADING: 'LOADING_STATISTIC',
    GET_STASTS: 'GET_STATISTICS',
    UPDATE_STATS: 'UPDATE_STATISTICS'
}


export const getAllStatistics = (token) => async (dispatch) => {
    try {
        dispatch({type:STATISTIC_TYPES.LOADING, payload: true});
        const res = await getDataApi('statistic',token);
        dispatch({ type: STATISTIC_TYPES.GET_STASTS, payload: res.data.results });
        dispatch({ type: STATISTIC_TYPES.LOADING, payload: false })
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message || error } })
    }
}