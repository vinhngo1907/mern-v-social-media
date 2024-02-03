import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import audiobell from './audio/got-it-done-613.mp3'
import { MESSAGE_TYPES } from './redux/actions/messageAction';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';
import { POST_TYPES } from './redux/actions/postAction';
import { SOCIAL_TYPES } from './redux/actions/socialAction';
import { VIDEOS_TYPES, playingVideo, updateTracks } from './redux/actions/videoAction';

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
    const { auth, socket, online, notify, call, videos: { player } } = useSelector(state => state);
    const dispatch = useDispatch();
    const audioRef = useRef();

    // join user
    useEffect(() => {
        socket.emit('joinUser', auth.user);

    }, [socket, auth.user]);

    // Message
    useEffect(() => {
        socket.on('addMessageToClient', msg => {
            // console.log({ msg });
            dispatch({ type: MESSAGE_TYPES.CREATE_MESSAGE, payload: msg });

            dispatch({
                type: MESSAGE_TYPES.ADD_USER,
                payload: {
                    ...msg.user,
                    text: msg.text,
                    media: msg.media
                }
            })
        })

        return () => socket.off('addMessageToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on("deleteMessageToClient", (data) => {
            // console.log({ data });
            const { msg, listMessages } = data;
            dispatch({
                type: MESSAGE_TYPES.DELETE_MESSAGE,
                payload: {
                    newData: listMessages,
                    _id: msg.sender
                }
            });
        });
        return () => socket.off("deleteMessageToClient");
    }, [socket, dispatch]);

    // Social
    useEffect(() => {
        socket.on("fetchYoutubeStats", (data) => {
            console.log({ data });
            if (data) {
                dispatch({ type: SOCIAL_TYPES.UPDATE_GITHUB_STATS, payload: data });
            }
        });
        return () => socket.off("fetchYoutubeStats");
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on("fetchGithubStats", (data) => {
            console.log({ data });
            if (data) {
                dispatch({ type: SOCIAL_TYPES.UPDATE_YT_STATS, payload: data });
            }
        });
        return () => socket.off("fetchGithubStats");
    }, [socket, dispatch]);

    // Conversation
    useEffect(() => {
        socket.on("deleteConversationToClient", (data) => {
            dispatch({ type: MESSAGE_TYPES.DELETE_CV, payload: data })
        });
        return () => socket.off("deleteConversationToClient");
    }, [socket, dispatch]);

    // Check user online
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

    // Check user offline
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
        socket.on('createNotifyToClient', (msg) => {
            dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });

            if (notify.sound) audioRef.current.play();
            spawnNotification(
                msg.user.username + ' ' + msg.text,
                msg.user.avatar,
                msg.url,
                'V-NETWORK'
            )
        });

        return () => socket.off('createNotifyToClient');
    }, [socket, dispatch, notify.sound]);

    useEffect(() => {
        socket.on('removeNotifyToClient', msg => {
            dispatch(({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg }))
        });

        return () => socket.off('removeNotifyToClient');
    }, [socket, dispatch]);

    // Post
    useEffect(() => {
        socket.on('likeToClient', post => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
        })

        return () => socket.off('likeToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('unLikeToClient', post => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
        });

        return () => socket.off('unLikeToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('createPostToClient', (post) => {
            console.log({ post });
            dispatch({ type: POST_TYPES.CREATE_POST, payload: post })
        });

        return () => socket.off("createPostToClient");
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('editPostToClient', (post) => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
        });
        return () => socket.off("editPostToClient");
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('deletePostToClient', (post) => {
            dispatch({ type: POST_TYPES.DELETE_POST, payload: post });
        });

        return () => socket.off('deletePostToClient');
    }, [socket, dispatch]);

    // Comments
    useEffect(() => {
        socket.on('createCommentToClient', post => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
        });

        return () => socket.off('createCommentToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('deleteCommentToClient', post => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: post })
        });

        return () => socket.off('deleteCommentToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('likeCommentToClient', post => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
        });

        return () => socket.off('likeCommentToClient');
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on('unLiekCommentToClient', post => {
            dispatch({ type: POST_TYPES.UPDATE_POST, payload: post });
        });

        return () => socket.off('unLiekCommentToClient');
    }, [socket, dispatch]);

    // Follow - UnFollow
    useEffect(() => {
        socket.on("followToClient", (newUser) => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
        });

        return () => socket.off('followToClient');
    }, [socket, auth, dispatch]);

    useEffect(() => {
        socket.on("unFollowToClient", (newUser) => {
            dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
        });

        return () => socket.off('unFollowToClient');
    }, [socket, auth, dispatch]);

    // Calll User
    useEffect(() => {
        socket.on("callUserToClient", data => {
            dispatch({ type: GLOBALTYPES.CALL, payload: data });
        });
        return () => socket.off("callUserToClient");
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on("userBusy", (data) => {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: `${call.username} is busy` } })
        });
        return () => socket.off("userBusy");
    }, [socket, dispatch, call]);


    useEffect(() => {
        // Listen for the "senior-tracks-update" event and update the state
        socket.on("senior-tracks-update", (tracks) => {
            // console.log({tracks});
            // setVideos(tracks);
            dispatch({ type: VIDEOS_TYPES.UPDATE_VIDEOS, payload: { videos: tracks } });
        });

        // Listen for the "junior-tracks-update" event and update the state
        socket.on("junior-tracks-update", (tracks) => {
            // console.log({tracks});
            // setVideos(tracks);
            dispatch({ type: VIDEOS_TYPES.UPDATE_VIDEOS, payload: { videos: tracks } });
        });

        // Listen for the "other-tracks-update" event and update the state
        socket.on("other-tracks-update", (tracks) => {
            // console.log({tracks});
            // setVideos(tracks);
            dispatch({ type: VIDEOS_TYPES.UPDATE_VIDEOS, payload: { videos: tracks } });
        });

        socket.on("video-queue-item-update", ({ id, likes, dislikes }) => {
            // updateCount(id, likes, dislikes, 'all')
        });

        // Clean up the event listeners when the component unmounts
        return () => {
            socket.off("senior-tracks-update");
            socket.off("junior-tracks-update");
            socket.off("other-tracks-update");
            socket.off("video-queue-item-update");
        };
    }, [socket, dispatch]);

    useEffect(() => {
        socket.on("update-tracks", (tracks) => {
            console.log(">>>>> [Update Tracks] <<<<<", { tracks })
            dispatch(updateTracks(tracks));
        });

        socket.on("playingVideo", async (data) => {
            console.log(">>>>> [Playing Video] <<<<<", { data })
            if (player === null || player === undefined) {
                // dispatch(playingVideo(data));
            }else{
                
            }
        });

        return () => {
            socket.off("update-tracks");
            socket.off("playingVideo");
        }
    }, [socket, dispatch, player]);

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }}>
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    )
}

export default SocketClient;