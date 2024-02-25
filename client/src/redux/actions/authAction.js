import { postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "../actions/globalTypes";
import { VIDEOS_TYPES } from "./videoAction";
import { validateLoginSMS } from "../../utils/valid"

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

        dispatch({
            type: VIDEOS_TYPES.SET_USER_EMAIL,
            payload: res.data.results.user.email
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
            // console.log(res.data)
            dispatch({
                type: GLOBALTYPES.AUTH, payload: {
                    user: res.data.results.user,
                    token: res.data.results.access_token
                }
            });

            dispatch({
                type: VIDEOS_TYPES.SET_USER_EMAIL,
                payload: res.data.results.user.email
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
        }
    } catch (err) {
        // console.log(err.response);
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

export const facebookLogin = (data) => async (dispatch) => {
    const { accessToken, userID } = data;
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataApi('auth/facebook-login', { accessToken, userID });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.results.message } });
        localStorage.setItem('firstLogin', true);
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                user: res.data.results.user,
                token: res.data.results.access_token
            },
        })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message } })
    }
}

export const loginSMS = (phone) => async (dispatch) => {
    const error = validateLoginSMS(phone);
    if (error.errLength > 0) {
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.errMsg } })
    }

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        const res = await postDataApi('auth/sms-login', { phone });
        console.log({ res });

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } });
        verifySMS(phone, dispatch)

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}

export const verifySMS = (phone) => async (dispatch) => {
    const code = prompt('Enter your code');
    if (!code) return;
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataApi('sms-verify', { phone, code });

        localStorage.setItem('firsLogin', true);

        const { data: { results: { user, access_token } } } = res;

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.message } })
       
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                user: user,
                token: access_token
            }
        });

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data?.message } });
    }
}