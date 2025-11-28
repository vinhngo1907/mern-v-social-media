import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../utils/apis/FetchData";

const initialState = {
    loading: false,
    data: [],
    sound: false,
}

export const getAllNotifies = createAsyncThunk(
    'notify/getAllNotifies',
    async (token, { dispatch, rejectWithValue }) => {
        try {
            const res = await getDataAPI('notify', token);
            return res.data.results;
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {
                    error: error?.response?.data?.message || error
                }
            });
            return rejectWithValue(error);
        }
    }
)

const notifySlice = createSlice({
    nmae: "notify",
    initialState,
    reducers: {
        setSound: (state, action) => {
            state.data = action.payload;
        },
        removeLocalNotify: (state, action) => {
            const msg = action.payload;
            state.data = state.data.filter(item => item._id !== msg._id || item.url !== msg.url)
        }
    },
    extraReducers: {

    }
});
export const { setSound, removeLocalNotify } = notifySlice.actions;
export default notifySlice.reducer;