import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginPass from "./auth/LoginPass";
import LoginSMS from "./auth/LoginSMS";

const Login = () => {
    const { auth } = useSelector(state => state);
    const history = useNavigate();
    const [sms, setSms] = useState(false);

    useEffect(() => {
        if (auth.token) history("/")
    }, [auth.token])

    return (
        <div className="auth_page">
            <div className="auth_box">
                <h3 className="text-uppercase text-center mb-4">V-Network</h3>
                {sms ? <LoginSMS /> : <LoginPass />}
                <div className="hr"> Or Login With </div>
                {/* <div className="social"></div> */}
                <div className="my-2">
                    <small className="row my-2 text text-primary">
                        <span className="col-6">
                            <Link to="/forgot_password">Forgot password?</Link>
                        </span>
                        <span className="col-6 text-end" onClick={() => setSms(!sms)}>
                            {sms ? 'Sign in with password' : 'Sign in with SMS'}
                        </span>
                    </small>
                </div>
                <p>
                    {`You don't have an account? `}
                    <Link to={`/register`} style={{ color: 'crimson' }}>
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login