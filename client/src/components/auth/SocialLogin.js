import React, { useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import { FacebookLogin } from 'react-facebook-login-lite';
import { gapi } from "gapi-script"
import { useDispatch } from "react-redux";
import { googleLogin } from "../../redux/actions/authAction";

const SocialLogin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "616694186975-olqok3eltlaouicov78vk2h3uhlepp1p.apps.googleusercontent.com",
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const onGGSuccess = (response) => {
        console.log(response);
        const { tokenId } = response
        dispatch(googleLogin({ idToken: tokenId }))
    }
    const onFailure = (err) => {
        console.log(err);
    }
    const onFBSuccess = async (response) => {
        console.log(response);
    }
    return (
        <>
            {/* <div className="my-2"> */}
            <GoogleLogin
                client_id='616694186975-olqok3eltlaouicov78vk2h3uhlepp1p.apps.googleusercontent.com'
                cookiepolicy='single_host_origin'
                onSuccess={onGGSuccess}
                onFailure={onFailure}
                buttonText="Sign in with Google"
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="1515286105607652"
                onSuccess={onFBSuccess}
            />
        </>
    )
}

export default SocialLogin