import { postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "../actions/globalTypes";

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataApi('auth/login', data);
        dispatch({
            type: GLOBALTYPES.AUTH, payload: {
                user: res.data.results.user,
                token: res.data.results.access_token
            }
        });
        localStorage.setItem('firstLogin', true);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } })
    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const refreshToken = () => async (dispatch) => {
    try {
        const firstLogin = localStorage.getItem('firstLogin');
        if (firstLogin) {
            const res = await postDataApi('auth/refresh-token');
            console.log(res.data)
            dispatch({
                type: GLOBALTYPES.AUTH, payload: {
                    user: res.data.results.user,
                    token: res.data.results.access_token
                }
            });
            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
        }
    } catch (err) {
        console.log(err.response);
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const logout = (token) => async (dispatch) => {
    try {
        const res = await postDataApi('auth/logout', null, token);
        localStorage.removeItem("firstLogin");
        window.location.href = "/";
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.results.message } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const googleLogin = ({ idToken }) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataApi('auth/google-login', { idToken });
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.results.message } });
        localStorage.setItem('firstLogin', true);
        dispatch({
            type: GLOBALTYPES.AUTH, payload: {
                user: res.data.results.user,
                token: res.data.results.access_token
            }
        })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}