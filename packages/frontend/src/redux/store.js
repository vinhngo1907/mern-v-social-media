import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import themeReducer from './themeSlice';
import suggestionReducer from './suggestionSlice';
import statusReducer from './statusSlice';
import notifyReducer from './notifySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    theme: themeReducer,
    suggestion: suggestionReducer,
    status: statusReducer,
    notify: notifyReducer,
  },
});
