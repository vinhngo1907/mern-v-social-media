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
import discover from './discoverReducer';
import statistic from './statisticReducer';
import socket from './socketReducer';
import message from './messageReducer';
import online from './onlineReducer';
import social from './socialReducer';
import call from './callReducer';
import peer from './peerReducer';
import medias from './mediaExploreReducer';
import videos from './videoReducer';

export default combineReducers({
    auth,
    social,
    alert,
    theme,
    sidebar,
    status,
    suggestion,
    profile,
    homePosts,
    notify,
    postDetail,
    discover,
    statistic,
    socket,
    message,
    online,
    call, 
    peer,
    medias,
    videos
});