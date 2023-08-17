import { GLOBALTYPES } from "./globalTypes"

export const forgotPassword = (data) => async (dispatch) => {
    try {

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const resetPassword = (data) => async (dispatch) => {
    try {

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}
