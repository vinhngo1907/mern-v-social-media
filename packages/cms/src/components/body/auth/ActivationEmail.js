import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notifications/Notification'

function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/auth/active', { token: activation_token });
                    setSuccess(res.data.message);
                } catch (error) {
                    setErr(error.response?.data?.message || "Something wrong!!!");
                }
            }
            activationEmail();
        }
    }, [activation_token])
    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    );
}

export default ActivationEmail