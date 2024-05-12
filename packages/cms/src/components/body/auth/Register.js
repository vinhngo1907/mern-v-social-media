import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
	const initialState = {
		name: '',
		account: '',
		password: '',
		cf_password: ''
	}
	const [userData, setUserData] = useState(initialState);
	const { name, account, password, cf_password } = userData;

	const handleInput = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	}
	const [pass, setPass] = useState(false);
	const [cfPass, setCfPass] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
	}
	return (
		<div className="auth_page">
			<div className="auth_box">
				<h3 className='text-uppercase text-center mb-4'>Register</h3>
				<form onSubmit={handleSubmit}>
					<div className="form-group mb-3">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							className="form-control" id="name"
							placeholder="Your name is up to 20 chars."
							name="name"
							onChange={handleInput}
							value={name}
						/>
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="form-group mb-3">
						<label htmlFor="account">Email / Phone number</label>
						<input
							type="text"
							className="form-control" id="account"
							aria-describedby="emailHelp"
							placeholder="Example@gmail.com/+84374481936"
							name="account"
							onChange={handleInput}
							value={account}
						/>
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
					<div className="form-group mb-3">
						<label htmlFor="password">Password</label>
						<div className="pass">
							<input type={pass ? 'text' : 'password'}
								className="form-control" id="password" placeholder="Password"
								name="password"
								onChange={handleInput}
								value={password}
							/>
							<small onClick={() => setPass(!pass)}>{pass ? 'hide' : 'show'}</small>
						</div>
					</div>
					<div className="form-group mb-3">
						<label htmlFor="cf_password">Confirm Password</label>
						<div className="pass">
							<input type={cfPass ? 'text' : 'password'}
								className="form-control"
								id="cf_password"
								placeholder="Confirm Password"
								onChange={handleInput}
								name="cf_password"
								value={cf_password}
							/>
							<small onClick={() => setCfPass(!cfPass)}>{cfPass ? 'hide' : 'show'}</small>
						</div>
					</div>
					<button type="submit" className="btn btn-dark w-100 mb-3">Submit</button>
				</form>
				<p className='mt-2'>
					Already have an account?
					<Link to='/login'>
						<button size='sm' className='ml-2 btn btn-info'>
							Login
						</button>
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
