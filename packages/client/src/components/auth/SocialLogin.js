// import { useEffect } from "react";
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
// import { gapi } from "gapi-script"
import { useDispatch, useSelector } from "react-redux";
import {
    // googleLogin,
    // facebookLogin,
    socialLogin
} from "../../redux/actions/authAction";
// import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    getAuth,
} from 'firebase/auth';
import { app } from "../../firebase/config"
const SocialLogin = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    //       const histore = history();
    //      useEffect(() => {
    //     if (auth.token) {
    //       return histore.push('/');
    //     }
    //   }, [auth.token, histore]);
    // useEffect(() => {
    //     function start() {
    //         gapi.client.init({
    //             clientId: "616694186975-olqok3eltlaouicov78vk2h3uhlepp1p.apps.googleusercontent.com",
    //             scope: 'email',
    //         });
    //     }

    //     gapi.load('client:auth2', start);
    // }, []);

    // const onGGSuccess = (response) => {
    //     // console.log(response);
    //     const { tokenId } = response
    //     dispatch(googleLogin({ idToken: tokenId }))
    // }
    // const onFailure = (err) => {
    //     console.log(err);
    // }
    // const onFBSuccess = async (response) => {
    //     // console.log(response);
    //     const { accessToken, userID } = response;
    //     dispatch(facebookLogin({ accessToken, userID }));
    // }

    const handleLoginWithGoogle = async () => {
        try {
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // console.log('Google user info:', user);
            const idToken = await user.getIdToken();
            // console.log('Google ID Token:', idToken);
            dispatch(
                socialLogin({
                    provider: 'google',
                    payload: { idToken: idToken },
                }),
            );
        } catch (error) {
            console.error('[ERROR_WITH_GG_LOGIN]:', error);
        }
    };
    const handleLoginWithFacebook = async () => {
        try {
            const auth = getAuth();
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Facebook user info:', user);
            const accessToken = result._tokenResponse.oauthAccessToken;
            const userID = user.providerData[0].uid;

            dispatch(
                socialLogin({
                    provider: 'facebook',
                    payload: { accessToken, userID },
                }),
            );
        } catch (error) {
            console.error('[ERROR_WITH_FB_LOGIN]:', error);
        }
    };

    return (
        <>
            {/* LOGIN LOGIN */}
            <button id="google-login" onClick={handleLoginWithGoogle}>
                <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                />
                <span>Login with Google</span>
            </button>
            {/* FACEBOOK LOGIN */}
            <button id="fb-login" onClick={handleLoginWithFacebook}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    alt="Facebook"
                />
                <span>Login with Facebook</span>
            </button>
        </>
    )
}

export default SocialLogin