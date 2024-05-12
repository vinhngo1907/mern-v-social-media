import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginPass from './LoginPass';
import LoginSMS from './LoginSMS';
import SocialLogin from './SocialLogin';

const Login = () => {
	const [sms, setSms] = useState(false);
	const history = useHistory();
	// const auth = useSelector(state => state.auth);
	return (
		<div className="auth_page">
			<div className="auth_box">
				<h3 className='text-uppercase text-center mb-4'>Login</h3>
				{sms ? <LoginSMS /> : <LoginPass />}
				<small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
					<span className="col-6">
						<Link to='/forgot-password'>
							Forgot password?
						</Link>
					</span>

					<span className="col-6 text-end" onClick={() => setSms(!sms)}>
						{sms ? 'Sign in with password' : 'Sign in with SMS'}
					</span>
				</small>
				<div className="hr">Or Login With</div>
				<SocialLogin />
				<p>
					{`You don't have an account? `}
					<Link to={`/register${history.location.search}`} style={{ color: 'crimson' }}>
						Register Now
					</Link>
				</p>
			</div>

		</div>
	)
}

export default Login
