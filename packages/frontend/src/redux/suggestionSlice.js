import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    loading: false
};

export const getSuggestion = createAsyncThunk(
    'suggestion/getSuggestion',
    async (_, thunkAPI) => {
        const { getState } = thunkAPI;
        const token = getState().auth.token;
        try {
        }
        catch (error) {

        }
    });

const suggestionSlice = createSlice({
    name: 'suggestion',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSuggestion.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSuggestion.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getSuggestion.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { setLoading } = suggestionSlice.actions;
export default suggestionSlice.reducer;