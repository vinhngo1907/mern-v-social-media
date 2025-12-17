import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GLOBALTYPES} from './globalTypes';
import {getDataAPI} from '../utils/apis/FetchData';

const initialState = {
  users: [],
  data: [],
  resultUsers: 0,
  firstLoad: false,
  deletedTempIds: [],
};

export const getConversations = createAsyncThunk(
  'message/getConversations',
  async ({page = 1, auth}, {dispatch, rejectWithValue}) => {
    try {
      const res = await getDataAPI(
        `conversation?limit=${page * 9}`,
        auth.token,
      );
      let newCV = [];
      const {results} = res.data;
      results.forEach(item => {
        item.recipients.forEach(cv => {
          if (cv._id !== auth.user._id) {
            newCV.push({
              ...cv,
              text: item.text,
              media: item.media,
              call: item.call,
            });
          }
        });
      });
      return {
        newCV,
        result: results.length,
      };
    } catch (error) {
      console.log(error);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: error?.response?.data?.message || error,
      });
      return rejectWithValue(error.response?.data?.message || error);
    }
  },
);

export const getMessages = createAsyncThunk(
  'message/getMessages',
  async ({auth, id, page = 1}, {dispatch, rejectWithValue}) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token,
      );
      const {results} = res.data;
      return {
        _id: id,
        messages: results.reverse(),
        result: results.length,
      };
    } catch (error) {
      console.log(error);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: error?.response?.data?.message || error,
      });
      return rejectWithValue(error.response?.data?.message || error);
    }
  },
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addUser: (state, action) => {
      if (state.users.every(u => u._id !== action.payload._id)) {
        state.users.unshift(action.payload);
      }
    },
    checkOnlineOffline: (state, action) => {
      state.users = state.users.map(u =>
        action.payload.includes(u._id)
          ? {...u, online: true}
          : {...u, online: false},
      );
    },
    deleteTempMessage: (state, action) => {
      state.data = state.data.map(item => ({
        ...item,
        messages: item.messages.filter(
          msg => msg._id !== action.payload.tempId,
        ),
      }));
    },
    updateMessageId: (state, action) => {
      const {tempId, savedMsg} = action.payload;
      const wasDeleted = state.deletedTempIds.includes(tempId);

      if (wasDeleted) return;

      state.data = state.data.map(cv => ({
        ...cv,
        messages: cv.messages.map(msg =>
          msg._id === tempId ? {...savedMsg, user: msg.user} : msg,
        ),
      }));

      state.deletedTempIds = state.deletedTempIds.filter(id => id !== tempId);
    },
    markTempMessageDeleted: (state, action) => {
      state.deletedTempIds.push(action.payload.tempId);
    },
    editMessageLocal: (state, action) => {
      state.data = state.data.map(conv =>
        conv._id === action.payload.id
          ? {...conv, messages: action.payload.newData}
          : conv,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.users = action.payload.newCV;
      state.resultUsers = action.payload.result;
      state.firstLoad = true;
    });
  },
});

export const {
  addUser,
  // createMessageLocal,
  // deleteConversationLocal,
  deleteTempMessage,
  updateMessageId,
  markTempMessageDeleted,
  // deleteMessageLocal,
  editMessageLocal,
} = messageSlice.actions;

export default messageSlice.reducer;
