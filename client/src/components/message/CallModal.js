import React, { useCallback, useEffect, useRef, useState } from "react";
import Avatar from "../other/Avatar";
import { useDispatch, useSelector } from "react-redux"
import { createMessage } from '../../redux/actions/messageAction'
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const CallModal = () => {
    const { auth, socket, peer, call, theme } = useSelector(state => state);
    const dispatch = useDispatch();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [total, setTotal] = useState(0);

    const [answer, setAnswer] = useState(false);
    const youVideo = useRef();
    const otherVideo = useRef();
    const [tracks, setTracks] = useState(null);
    const [newCall, setNewCall] = useState(null);

    // Set time
    useEffect(() => {
        const setTime = () => {
            setTotal(t => t + 1);
            setTimeout(setTime, 1000);
        }
        setTime();
    }, []);

    useEffect(() => {
        setSeconds(total % 60);
        setMinutes(total / 60);
        setHours(total / 3600);
    }, [total]);

    // end call
    const addCallMessage = useCallback((call, times, disconnect) => {
        if (call.recipient !== auth.user._id || disconnect) {
            const msg = {
                sender: call.sender,
                recipient: call.recipient,
                text: '',
                media: [],
                call: { video: call.video, times },
                createdAt: new Date().toISOString()
            }
            dispatch(createMessage({ msg, auth, socket }));
        }
    }, [auth, dispatch, socket]);

    const handleEndCall = () => {
        tracks && tracks.forEach(track => track.stop());
        if (newCall) newCall.close();
        let times = answer ? total : 0;
        socket.emit('endCall', { ...call, times });
        addCallMessage(call, times);
        dispatch({ type: GLOBALTYPES.CALL, payload: null });
    }

    useEffect(()=>{

    },[]);
    
    return (
        <div className="call_modal">
            <div className="call_box" style={{
                display: (answer && call.video) ? 'none' : 'flex'
            }} >
                <div className="text-center" style={{ padding: '40px 0' }} >
                    <Avatar src={call.avatar} size="supper-avatar" />
                    <h4>{call.username}</h4>
                    <h6>{call.fullname}</h6>

                    {
                        answer
                            ? <div>
                                <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
                                <span>:</span>
                                <span>{minutes.toString().length < 2 ? '0' + minutes : minutes}</span>
                                <span>:</span>
                                <span>{seconds.toString().length < 2 ? '0' + seconds : seconds}</span>
                            </div>
                            : <div>
                                {
                                    call.video
                                        ? <span>calling video...</span>
                                        : <span>calling audio...</span>
                                }
                            </div>
                    }

                </div>
                {
                    !answer &&
                    <div className="timer">
                        <small>{minutes.toString().length < 2 ? '0' + minutes : minutes}</small>
                        <small>:</small>
                        <small>{seconds.toString().length < 2 ? '0' + seconds : seconds}</small>
                    </div>
                }
                {/* call menu */}
            </div>
            <div className="show_video" style={{
                opacity: (answer && call.video) ? '1' : '0',
                filter: theme ? 'invert(1)' : 'invert(0)'
            }} >
                <video ref={youVideo} className="you_video" playsInline muted />
                <video ref={otherVideo} className="other_video" playsInline />

                <div className="time_video">
                    <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
                    <span>:</span>
                    <span>{minutes.toString().length < 2 ? '0' + minutes : minutes}</span>
                    <span>:</span>
                    <span>{seconds.toString().length < 2 ? '0' + seconds : seconds}</span>
                </div>

                <button className="material-icons text-danger end_call"
                    onClick={handleEndCall}>
                    call_end
                </button>
            </div>
        </div>
    )
}

export default CallModal;