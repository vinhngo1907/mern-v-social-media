import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getDataAPI} from '../utils/apis/FetchData';

const initialState = {
  visitCount: 0,
  viewCount: 0,
  clients: [],
  loading: false,
  ids: [],
};

export const fetchStatistics = createAsyncThunk(
  'statistic/',
  async ({id, type, auth}, thunkAPI) => {
    try {
      await getDataAPI(`statistic/fetch?type=${type}&id=${id}`, auth.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err);
    }
  },
);

export const getTotalStatistics = createAsyncThunk(
  'statistic/getTotalStatistics',
  async ({token, user}, thunkAPI) => {
    const {dispatch} = thunkAPI;
    dispatch(addId(user._id));
    try {
      const res = await getDataAPI('statistic', token);
      const {results} = res.data;
      dispatch(addClient(results.users));
      return results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error);
    }
  },
);

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setLoading: (state, action) => (state.loading = action.payload),
    setStatisitc: (state, action) => action.payload,
    addId: (state, action) => state.ids.push(action.payload),
    addClient: (state, action) => state.clients.push(action.payload),
  },
  extraReducers: builder => {
    builder
      .addCase(getTotalStatistics.fulfilled, (state, action) => {
        state.visitCount = action.payload.visitCount;
        state.viewCount = action.payload.viewCount;
        state.clients = action.payload.clients;
        state.loading = false;
      })
      .addCase(getTotalStatistics.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setLoading, addId, addClient} = statisticSlice.actions;
export default statisticSlice.reducer;
