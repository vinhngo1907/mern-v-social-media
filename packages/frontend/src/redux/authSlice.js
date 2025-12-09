import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postDataAPI} from '../utils/apis/FetchData';
// import {apiUrl} from '../context/constants';
import {setLoading, setSuccess, setError, setAlertFields} from './alertSlice';
import valid from '../utils/validation/valid';

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  const {dispatch} = thunkAPI;
  try {
    dispatch(setLoading());

    const res = await postDataAPI(`auth/login`, data);
    localStorage.setItem('firstLogin', true);

    dispatch(setSuccess(res.data.message));

    return {
      token: res.data.results.access_token,
      user: res.data.results.user,
      msg: res.data.message,
    };
  } catch (error) {
    dispatch(setError(error.response?.data?.msg || 'Login failed'));
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    const {dispatch} = thunkAPI;
    const check = valid(data);
    // console.log(">>>", check)
    if (check.errLength > 0) {
      dispatch(setAlertFields(check.errMsg));
      return thunkAPI.rejectWithValue(check.errMsg);
    }

    try {
      dispatch(setLoading());

      const res = await postDataAPI(`auth/register`, data);
      localStorage.setItem('firstLogin', true);

      dispatch(setSuccess(res.data.message));

      return {
        token: res.data.results.access_token,
        user: res.data.results.user,
        msg: res.data.message,
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Register failed';
      dispatch(setError(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (!firstLogin) throw new Error('No login found');
    const res = await postDataAPI(`auth/refresh-token`);

    return {
      token: res.data.results.access_token,
      user: res.data.results.user,
    };
  },
);

export const loginSMS = createAsyncThunk(
  'auth/loginSMS',
  async (phone, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
      dispatch(setLoading());

      const res = await postDataAPI(`auth/login_sms`, {phone});
      localStorage.setItem('firstLogin', true);

      dispatch(setSuccess(res.data.message));

      return {
        token: res.data.results.access_token,
        user: res.data.results.user,
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Login with SMS failed';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  },
);

export const socialLogin = createAsyncThunk(
  'auth/socialLogin',
  async ({provider, payload}, thunkAPI) => {
    const {dispatch} = thunkAPI;

    try {
      dispatch(setLoading());

      let endpoint = '';
      let body = {};

      if (provider === 'google') {
        endpoint = 'auth/social-login/google';
        body = {idToken: payload.idToken};
      } else if (provider === 'facebook') {
        endpoint = 'auth/facebook-login';
        body = {
          accessToken: payload.accessToken,
          userID: payload.userID,
        };
      } else {
        return thunkAPI.rejectWithValue('Provider not supported');
      }

      const res = await postDataAPI(endpoint, body);

      localStorage.setItem('firstLogin', true);

      dispatch(setSuccess(res.data.message));

      return {
        token: res.data.results.access_token,
        user: res.data.results.user,
        msg: res.data.message,
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Social login failed';
      dispatch(setError(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// 🧠 Slice
const initialState = {
  token: '',
  user: null,
  loading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = '';
      state.user = null;
      localStorage.removeItem('firstLogin');
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
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
      // Register
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.success = action.payload.msg;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      // SOCIAL LOGIN (Google / Facebook)
      .addCase(socialLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.success = action.payload.msg;
      })
      .addCase(socialLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
