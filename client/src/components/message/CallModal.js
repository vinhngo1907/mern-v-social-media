import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

const CallModal = () => {
    const { auth, socket, peer, call } = useSelector(state => state);
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

    }, [auth, dispatch, socket]);

    const handleEndCall = () => {

    }
    return (
        <div className="call_modal"></div>
    )
}

export default CallModal;