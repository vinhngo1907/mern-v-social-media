import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import audiobell from './audio/got-it-done-613.mp3'
import { GLOBALTYPES } from './redux/actions/globalTypes';
// import { MESSAGE_TYPES } from './redux/actions/messageAction';
// import { GLOBALTYPES } from './redux/actions/globalTypes';
// import { NOTIFY_TYPES } from './redux/actions/notifyAction';

const SocketClient = () => {
    const { auth, socket, online } = useSelector(state => state);
    const dispatch = useDispatch();
    const audioRef = useRef();

    // join user
    useEffect(() => {
        socket.emit('joinUser', auth.user);

    }, [socket, auth.user]);

    // Check user online/offline
    useEffect(() => {
        socket.emit('checkUserOnline', auth.user);
    }, [socket, auth.user]);

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data => {
            data.forEach(user => {
                if (!online.includes(user.id)) {
                    dispatch({ type: GLOBALTYPES.ONLINE, payload: user.id })
                }
            })
        });
    }, [socket, dispatch, online])

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }}>
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    )
}

export default SocketClient;