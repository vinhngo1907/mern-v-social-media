import React, { useEffect, useState } from "react";
import SocialLogin from "../components/auth/SocialLogin";
import { Link, useHistory } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";
import { useSelector } from "react-redux";

const Login = () => {
	const {auth} = useSelector(state=>state);
	const history = useHistory();
	
	useEffect(()=>{
		if(auth.token){
			return history.push("/")
		}
	},[auth.token, history])
	
	const [sms, setSms] = useState(false);

	return (
		<div className="auth_page">
			<div className="auth_box">
				<h3 className="text-uppercase text-center mb-4">V-Network</h3>
				{sms ? <LoginSMS /> : <LoginPass />}
				<div className="hr">Or Login With</div>
				<div className="social"><SocialLogin /></div>
				<div className="my-2">
					<small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
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

export default Login;