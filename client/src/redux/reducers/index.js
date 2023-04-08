import { combineReducers } from 'redux';

import auth from './authReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import sidebar from './sidebarReducer';

export default combineReducers({
    auth,
    alert,
    theme,
    sidebar
})