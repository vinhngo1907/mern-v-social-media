import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    success: '',
    email: '',
    password: '',
    cf_password: ''
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = '';
            state.success = '';
            state.email = '';
            state.password = '';
            state.cf_password = '';
        },
        setSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
            state.error = '';
            state.email = '';
            state.password = '';
            state.cf_password = '';
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = '';
            state.email = '';
            state.password = '';
            state.cf_password = '';
        },
        setAlertFields: (state, action) => {
            return {
                ...state,
                ...action.payload,
                loading: false,
                success: '',
                error: ''
            };
        },
        clearAlert: () => initialState
    }
});

export const { setLoading, setSuccess, setError, setAlertFields, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
