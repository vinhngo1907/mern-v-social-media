import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getDataAPI} from '../utils/apis/FetchData';
import {GLOBALTYPES} from './globalTypes';

export const getSocialStatistics = createAsyncThunk(
  'social/getSocialStatistics',
  async (token, {dispatch, rejectWithValue}) => {
    try {
      const res = await getDataAPI('statistic/social', token);
      return res.data.results;
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: err?.response?.data?.message || err,
      });
      return rejectWithValue(err);
    }
  },
);

const updateDataSocial = (data, payload) => {
  const idx = data.findIndex(d => d.title === payload.title);
  if (idx !== -1) {
    const newData = [...data];
    newData[idx] = payload;
    return newData;
  } else {
    return [...data, payload];
  }
};

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    updateGithubStats: (state, action) => {
      state.data = updateDataSocial(state.data, action.payload);
    },
    updateYoutubeStats: (state, action) => {
      state.data = updateDataSocial(state.data, action.payload);
    },
    updateSocialStats: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSocialStatistics.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSocialStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSocialStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {updateGithubStats, updateYoutubeStats, updateSocialStats} =
  socialSlice.actions;

export default socialSlice.reducer;
