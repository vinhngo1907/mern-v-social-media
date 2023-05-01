import { combineReducers } from 'redux';

import auth from './authReducer';
import alert from './alertReducer';
import theme from './themeReducer';
import sidebar from './sidebarReducer';
import status from './statusReducer';
import suggestion from './suggestionReducer';
import profile from './profileReducer';
import homePosts from './postReducer'
import notify from './notifyReducer';
import postDetail from './postDetailReducer';

export default combineReducers({
    auth,
    alert,
    theme,
    sidebar,
    status,
    suggestion,
    profile,
    homePosts,
    notify,
    postDetail
})