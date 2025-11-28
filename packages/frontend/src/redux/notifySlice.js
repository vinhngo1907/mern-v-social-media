import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GLOBALTYPES} from './globalTypes';
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from '../utils/apis/FetchData';

export const NOTIFY_TYPES = {
  GET_NOTIFIES: 'GET_NOTIFIES',
  CREATE_NOTIFY: 'CREATE_NOTIFY',
  REMOVE_NOTIFY: 'REMOVE_NOTIFY',
  UPDATE_NOTIFY: 'UPDATE_NOTIFY',
  UPDATE_SOUND: 'UPDATE_SOUND',
  DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES',
};

const initialState = {
  loading: false,
  data: [],
  sound: false,
};

export const getAllNotifies = createAsyncThunk(
  'notify/getAllNotifies',
  async (token, {dispatch, rejectWithValue}) => {
    try {
      const res = await getDataAPI('notify', token);
      return res.data.results;
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error?.response?.data?.message || error,
        },
      });
      return rejectWithValue(error);
    }
  },
);

export const isReadNotify = createAsyncThunk(
  'notify/isReadNotify',
  async ({msg, auth}, {dispatch, rejectWithValue}) => {
    try {
      await patchDataAPI(`/notify/${msg._id}`, auth.token);
      return {...msg, isRead: true};
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: error.response.data.message || error},
      });
      return rejectWithValue(error);
    }
  },
);

export const createNotify = createAsyncThunk(
  'notify/createNotify',
  async ({msg, auth, socket}, {dispatch, rejectWithValue}) => {
    try {
      const res = await postDataAPI('notify', msg, auth.token);
      socket.emit('createNotify', {
        ...res.data.results,
        user: {
          _id: auth.user._id,
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
      return res.data.results;
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: err?.response?.data?.message || err,
      });
      return rejectWithValue(err);
    }
  },
);

export const removeNotify = createAsyncThunk(
  'notify/removeNotify',
  async ({msg, auth, socket}, {dispatch, rejectWithValue}) => {
    try {
      await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);
      socket.emit('removeNotify', msg);
      return msg;
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: error.response.data.message || error},
      });
      return rejectWithValue(error);
    }
  },
);

export const deleteAllNotifies = createAsyncThunk(
  'notify/deleteAll',
  async (token, {dispatch, rejectWithValue}) => {
    try {
      await deleteDataAPI('notify', token);
      return [];
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: err?.response?.data?.message || err,
      });
      return rejectWithValue(err);
    }
  },
);

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    removeLocalNotify: (state, action) => {
      const msg = action.payload;
      state.data = state.data.filter(
        item => item._id !== msg._id || item.url !== msg.url,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllNotifies.pending, state => {
        state.loading = true;
      })
      .addCase(getAllNotifies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllNotifies.rejected, state => {
        state.loading = false;
      })

      .addCase(createNotify.fulfilled, (state, action) => {
        state.data.unshift(action.payload);
      })

      .addCase(removeNotify.fulfilled, (state, action) => {
        const removed = action.payload;
        state.data = state.data.filter(
          item => item._id !== removed._id || item.url !== removed.url,
        );
      })

      .addCase(isReadNotify.fulfilled, (state, action) => {
        const readNotify = action.payload;
        const index = state.data.findIndex(n => n._id === readNotify._id);
        if (index !== -1) {
          state.data[index] = readNotify;
        }
      })

      .addCase(deleteAllNotifies.fulfilled, (state, action) => {
        state.data = action.payload; // []
      });
  },
});

export const {setSound, removeLocalNotify} = notifySlice.actions;
export default notifySlice.reducer;
