import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const SOCIAL_TYPES = {
    LOADING: 'LOADING_SOCIAL',
    GET_SOCIAL_STATS: 'GET_SOCIAL',
    UPDATE_SOCIAL_STATS: 'UPDATE_SOCIAL'
}

export const getSocialStatistics = (token) => async (dispatch) => {
    try {
        dispatch({ type: SOCIAL_TYPES.LOADING, payload: true });
        const res = await getDataApi('statistic/socials', token);
        dispatch({ type: SOCIAL_TYPES.LOADING, payload: false });
        dispatch({ type: SOCIAL_TYPES.GET_SOCIAL_STATS, payload: res.data.results });
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}
