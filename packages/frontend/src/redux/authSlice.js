import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postDataAPI } from '../utils/apis/FetchData';
import { transactionUrl } from '../context/constants';
import { setLoading, setSuccess, setError, setAlertFields } from './alertSlice';
import valid from '../utils/validation/valid';

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    // const res = await postDataAPI(`${transactionUrl}/api/auth/login`, data);
    // localStorage.setItem('firstLogin', true);
    // return {
    //     token: res.data.accessToken,
    //     user: res.data.user,
    //     msg: res.data.msg,
    // };
    const { dispatch } = thunkAPI;
    try {
        dispatch(setLoading());

        const res = await postDataAPI(`${transactionUrl}/api/auth/login`, data);
        localStorage.setItem('firstLogin', true);

        dispatch(setSuccess(res.data.msg));

        return {
            token: res.data.accessToken,
            user: res.data.user,
            msg: res.data.msg,
        };
    } catch (error) {
        dispatch(setError(error.response?.data?.msg || 'Login failed'));
        return thunkAPI.rejectWithValue(error.response?.data?.msg);
    }
});

// export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
//     const { dispatch } = thunkAPI; Performance
//     const res = await postDataAPI(`${transactionUrl}/api/auth/register`, data);
//     localStorage.setItem('firstLogin', true);
//     return {
//         token: res.data.accessToken,
//         user: res.data.user,
//         msg: res.data.msg,
//     };
// });

export const register = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
        const { dispatch } = thunkAPI;
        const check = valid(data);
        // console.log(">>>", check)
        if (check.errLength > 0) {
            dispatch(setAlertFields(check.errMsg));
            return thunkAPI.rejectWithValue(check.errMsg);
        }

        try {
            dispatch(setLoading());

            const res = await postDataAPI(`${transactionUrl}/api/auth/register`, data);
            localStorage.setItem('firstLogin', true);

            dispatch(setSuccess(res.data.msg));

            return {
                token: res.data.accessToken,
                user: res.data.user,
                msg: res.data.msg,
            };
        } catch (error) {
            const message = error.response?.data?.msg || 'Register failed';
            dispatch(setError(message));
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (!firstLogin) throw new Error('No login found');
    const res = await postDataAPI(`${transactionUrl}/api/auth/refresh_token`);
    // console.log("????", res.data)
    return {
        token: res.data.accessToken,
        user: res.data.user,
    };
});

// 🧠 Slice
const initialState = {
    token: '',
    user: null,
    loading: false,
    error: null,
    success: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = '';
            state.user = null;
            localStorage.removeItem('firstLogin');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.success = action.payload.msg;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.success = action.payload.msg;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;