import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { transactionUrl } from '../context/constants';

// Async thunk
export const getTransactions = createAsyncThunk(
    'transaction/getTransactions',
    async (page = 1, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const res = await axios.get(`${transactionUrl}/api/transactions?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.msg || 'Failed to load transactions'
            );
        }
    }
);

// Initial State
const initialState = {
    data: [],
    page: 1,
    totalPages: 1,
    total: 0,
    loading: false,
    error: null,
};

// Slice
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.transactions;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
                state.total = action.payload.total;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export default transactionSlice.reducer;