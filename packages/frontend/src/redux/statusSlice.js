import {createSlice} from '@reduxjs/toolkit';

const initialState = null;

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action) => action.payload,
  },
});

export const {setStatus} = statusSlice.actions;
export default statusSlice.reducer;
