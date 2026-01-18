import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import themeReducer from './themeSlice';
import suggestionReducer from './suggestionSlice';
import statusReducer from './statusSlice';
import notifyReducer from './notifySlice';
import statisticReducer from './statisticSlice';
import messageReducer from './messageSlice';
import socialReducer from './socialSlice';
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    theme: themeReducer,
    profile: profileReducer,
    suggestion: suggestionReducer,
    status: statusReducer,
    notify: notifyReducer,
    statistic: statisticReducer,
    message: messageReducer,
    social: socialReducer,
  },
});
