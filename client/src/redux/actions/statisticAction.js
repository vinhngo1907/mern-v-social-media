// import { getDataApi } from "../../utils/fetchData"
import { GLOBALTYPES } from "./globalTypes"

export const STATISTIC_TYPES = {
    LOADING: 'LOADING_STATISTIC',
    GET_STASTS: 'GET_STATISTICS',
    UPDATE_STATS: 'UPDATE_STATISTICS'
}


export const getAllStatistics = (token) => async (dispatch) => {
    try {
        // const res = await getDataApi('')
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message || error } })
    }
}