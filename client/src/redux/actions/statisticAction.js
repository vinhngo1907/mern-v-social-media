import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const STATISTIC_TYPES = {
    LOADING: 'LOADING_STATISTIC',
    GET_STATS: 'GET_STATISTICS',
    UPDATE_STATS: 'UPDATE_STATISTICS',
    GET_ID: "GET_STATS_ID",
    GET_CLIENT: 'GET_STAT_CLIENT',
}

export const fetchStatistics = ({ id, type, auth }) => async (dispatch) => {
    try {
        // const res = 
        await getDataApi(`statistic/fetch?type=${type}&id=${id}`, auth.token);
        // dispatch({ type: STATISTIC_TYPES.GET_STATS, payload: res.data.results });
    } catch (err) {
        console.log(err);
        // dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err?.response?.data?.message || err } });
    }
}

export const getTotalStatistics = (token, user) => async (dispatch) => {
    console.log({ token, user });
    dispatch({ type: STATISTIC_TYPES.GET_ID, payload: user._id });
    try {
        dispatch({ type: STATISTIC_TYPES.LOADING, payload: true });
        const res = await getDataApi("statistic", token);
        // console.log(res.data);
        const { data: { results: { user } } } = res;
        dispatch({ type: STATISTIC_TYPES.GET_CLIENT, payload: { client: user } });
        dispatch({ type: STATISTIC_TYPES.GET_STATS, payload: res.data.results });
        dispatch({ type: STATISTIC_TYPES.LOADING, payload: false });
    } catch (err) {
        console.log(err || err?.response.data.message)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
    }
}