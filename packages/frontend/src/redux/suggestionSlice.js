import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getDataAPI} from '../utils/apis/FetchData';

const initialState = {
  users: [],
  loading: false,
  // error: null
};

export const getSuggestion = createAsyncThunk(
  'suggestion/getSuggestion',
  async (token, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    // const token = getState().auth.token;

    try {
      const res = await getDataAPI('user/suggestion', token);
      const {results} = res.data;
      return results;
    } catch (error) {
      rejectWithValue(error.response?.data?.message || error);
    }
  },
);

const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSuggestion.pending, state => {
        state.loading = true;
      })
      .addCase(getSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(getSuggestion.rejected, state => {
        state.loading = false;
        state.users = [];
      });
  },
});

export const {setLoading} = suggestionSlice.actions;
export default suggestionSlice.reducer;
