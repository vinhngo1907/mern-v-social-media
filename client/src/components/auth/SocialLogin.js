import React, { useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import { FacebookLogin } from 'react-facebook-login-lite';
import {gapi} from "gapi-script"

const SocialLogin = () => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "699388591357-0t33r1ldkl5io1ghl68hmcpv1crma97g.apps.googleusercontent.com",
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const onGGSuccess = (response)=>{
        console.log(response);
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
                    client_id='699388591357-0t33r1ldkl5io1ghl68hmcpv1crma97g.apps.googleusercontent.com'
                    cookiepolicy='single_host_origin'
                    onSuccess={onGGSuccess}
                    onFailure={onFailure}
                    buttonText="Sign in with Google"
                    cookiePolicy={'single_host_origin'}
                />
            {/* </div> */}

            {/* <div className="my-2"> */}
                <FacebookLogin
                    appId="1515286105607652"
                    onSuccess={onFBSuccess}
                />
            {/* </div> */}
        </>
    )
}

export default SocialLogin