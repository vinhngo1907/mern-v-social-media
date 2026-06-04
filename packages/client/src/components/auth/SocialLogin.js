import React, { useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { gapi } from "gapi-script"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    googleLogin,
    facebookLogin,
    // socialLogin
} from "../../redux/actions/authAction";
import { FB_APP_ID, GG_CLIENT_ID } from "../../utils/constants";
// import {
//     GoogleAuthProvider,
//     FacebookAuthProvider,
//     signInWithPopup,
//     getAuth,
// } from 'firebase/auth';

// import { app } from "../../firebase/config";

const SocialLogin = () => {
    const { auth } = useSelector(state => state);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) {
            return history.push('/');
        }
    }, [auth.token, history]);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: GG_CLIENT_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const onGGSuccess = (response) => {
        // console.log(response);
        const { tokenId } = response
        dispatch(googleLogin({ idToken: tokenId }))
    }
    const onFailure = (err) => {
        console.log(err);
    }
    const onFBSuccess = async (response) => {
        // console.log(response);
        const { accessToken, userID } = response;
        dispatch(facebookLogin({ accessToken, userID }));
    }

    // const handleLoginWithGoogle = async () => {
    //     try {
    //         const auth = getAuth(app);
    //         const provider = new GoogleAuthProvider();
    //         const result = await signInWithPopup(auth, provider);
    //         const user = result.user;
    //         // console.log('Google user info:', user);
    //         const idToken = await user.getIdToken();
    //         // console.log('Google ID Token:', idToken);
    //         dispatch(
    //             socialLogin({
    //                 provider: 'google',
    //                 payload: { idToken: idToken },
    //             }),
    //         );
    //     } catch (error) {
    //         console.error('[ERROR_WITH_GG_LOGIN]:', error);
    //     }
    // };
    // const handleLoginWithFacebook = async () => {
    //     try {
    //         const auth = getAuth();
    //         const provider = new FacebookAuthProvider();
    //         const result = await signInWithPopup(auth, provider);
    //         const user = result.user;
    //         console.log('Facebook user info:', user);
    //         const accessToken = result._tokenResponse.oauthAccessToken;
    //         const userID = user.providerData[0].uid;

    //         dispatch(
    //             socialLogin({
    //                 provider: 'facebook',
    //                 payload: { accessToken, userID },
    //             }),
    //         );
    //     } catch (error) {
    //         console.error('[ERROR_WITH_FB_LOGIN]:', error);
    //     }
    // };

    return (
        <>
            {/* LOGIN LOGIN */}
            {/* <button id="google-login" onClick={handleLoginWithGoogle}>
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                />
                <span>Login with Google</span>
            </button> */}
            {/* FACEBOOK LOGIN */}
            {/* <button id="fb-login" onClick={handleLoginWithFacebook}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    alt="Facebook"
                />
                <span>Login with Facebook</span>
            </button> */}
            <div className="my-2">
                <GoogleLogin
                    clientId={GG_CLIENT_ID}
                    buttonText="Sign in with Google"
                    onSuccess={onGGSuccess}
                    cookiePolicy={'single_host_origin'}
                    onFailure={onFailure}
                />
            </div>
            <div className="my-2">
                <FacebookLogin
                    appId={FB_APP_ID}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={onFBSuccess}
                // cssClass="my-facebook-button-class"
                />
            </div>
        </>
    )
}

export default SocialLogin