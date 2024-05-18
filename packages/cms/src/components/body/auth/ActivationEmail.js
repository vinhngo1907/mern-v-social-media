import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../../utils/notifications/Notification'

function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    );
}

export default ActivationEmail