import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import audiobell from './audio/got-it-done-613.mp3'
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { MESSAGE_TYPES } from './redux/actions/messageAction';
// import { GLOBALTYPES } from './redux/actions/globalTypes';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';

const spawnNotification = (body, icon, url, title) => {
    let options = {
        body, icon
    }
    let n = new Notification(title, options)

    n.onclick = e => {
        e.preventDefault()
        window.open(url, '_blank')
    }
}

const SocketClient = () => {
    const { auth, socket, online, notify } = useSelector(state => state);
    const dispatch = useDispatch();
    const audioRef = useRef();

    // join user
    useEffect(() => {
        socket.emit('joinUser', auth.user);

    }, [socket, auth.user]);

    // Message
    useEffect(() => {
        socket.on('addMessageToClient', msg => {
            dispatch({ type: MESSAGE_TYPES.CREATE_MESSAGE, payload: msg })

            dispatch({
                type: MESSAGE_TYPES.ADD_USER,
                payload: {
                    ...msg.user,
                    text: msg.text,
                    media: msg.media
                }
            })
        })

        return () => socket.off('addMessageToClient')
    }, [socket, dispatch]);

    // Check user online/offline
    useEffect(() => {
        socket.emit('checkUserOnline', auth.user);
    }, [socket, auth.user]);

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data => {
            data.forEach(item => {
                if (!online.includes(item.id)) {
                    dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id })
                }
            })
        })

        return () => socket.off('checkUserOnlineToMe')
    }, [socket, dispatch, online]);

    useEffect(() => {
        socket.on('checkUserOnlineToClient', id => {
            if (!online.includes(id)) {
                dispatch({ type: GLOBALTYPES.ONLINE, payload: id })
            }
        });
        return () => socket.off("checkUserOnlineToClient");

    }, [socket, dispatch, online]);

    useEffect(() => {
        socket.on('checkUserOffline', id => {
            if (online.includes(id)) {
                dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
            }
        });

        return () => socket.off('checkUserOffline');
    }, [socket, dispatch, online]);

    // Notification
    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });
            if (notify.sound) audioRef.current.play()
            spawnNotification(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'V-NETWORK'
            )
        });
        return socket.off('createNotifyToClient');
    }, [socket, dispatch, notify.sound]);

    useEffect(() => {
        socket.on('removeNotifyToClient', msg => {
            dispatch(({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg }))
        })
        return socket.off('removeNotifyToClient');
    }, [socket, dispatch]);

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }}>
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    )
}

export default SocketClient;