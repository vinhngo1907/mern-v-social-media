import {createSlice} from '@reduxjs/toolkit';

const initialState = null;

const themSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => action.payload,
  },
});

export const {setTheme} = themSlice.actions;
export default themSlice.reducer;
