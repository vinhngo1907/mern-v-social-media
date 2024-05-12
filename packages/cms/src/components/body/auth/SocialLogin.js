import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { showErrMsg, showSuccessMsg } from '../../utils/notifications/Notification'
import { dispatchLogin } from '../../../redux/actions/authAction';
import { gapi } from "gapi-script";
import axios from 'axios';

function SocialLogin() {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "699388591357-0t33r1ldkl5io1ghl68hmcpv1crma97g.apps.googleusercontent.com",
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);
    
    const initialState = {
        // account: '',
        // password: '',
        success: '',
        err: ''
    }
    const dispatch = useDispatch();
    const [user, setUser] = useState(initialState);
    const { err, success } = user;
    const history = useHistory();

    const responseGoogle = async (response) => {
        try {
            // console.log(response.tokenId);
            const res = await axios.post('/api/auth/google-login', { tokenId: response.tokenId });
            setUser({ ...user, success: res.data.message, err: '' });
            dispatch(dispatchLogin());
            localStorage.setItem('firstLogin', true);
            history.push('/');
        } catch (error) {
            error.response.data.message && setUser({ ...user, err: error.response.data.message, success: '' });
        }
    }

    const LoginFailure = async (response) => {
        console.log(response);
    }

    const responseFacebook = async (response) => {
        console.log(response)
        const { accessToken, userID } = response;
        try {
            const res = await axios.post('/api/auth/facebook-login', { accessToken, userID });
            setUser({ ...user, success: res.data.message, err: '' });
            localStorage.setItem('firstLogin', true);
            history.push("/");
        } catch (error) {
            // console.log(error);
            error.response.data.message && setUser({ ...user, err: error.response.data.message, success: '' })
        }
    }

    return (
        <div className='social'>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div className="my-2">
                <GoogleLogin
                    clientId="699388591357-0t33r1ldkl5io1ghl68hmcpv1crma97g.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    onFailure={LoginFailure}
                />

            </div>

            <div className="my-2">
                <FacebookLogin
                    appId="1515286105607652"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                // cssClass="my-facebook-button-class"
                />
            </div>
        </div>
    )
}

export default SocialLogin