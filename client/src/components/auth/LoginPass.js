import React, { useState } from "react";

const LoginPass = () => {
	const [typePass, setTypePass] = useState(false);
	const [userData, setUserData] = useState({
		account: '',
		password: ''
	});
	const handleChangeInput = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	const { account, password } = userData;
	const handleSubmit = (e) => {

	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="account"> Email / Username</label>
					<input type="email" className="form-control" id="account"
						aria-describedby="emailHelp" placeholder="Enter account"
						name="account" onChange={handleChangeInput} value={account} />
				</div>
				<div className="form-group mb-3">
					<label htmlFor="password" className="form-label">Password</label>

					<div className="pass">
						<input type={typePass ? "text" : "password"}
							className="form-control"
							id="password"
							name="password" value={password}
							onChange={handleChangeInput}
						/>

						<small onClick={() => setTypePass(!typePass)}>
							{typePass ? 'Hide' : 'Show'}
						</small>
					</div>
				</div>
				<button type="submit" className="btn btn-dark w-100 mt-1" disabled={(account && password) ? false : true}>
					Submit
				</button>
			</form>
		</>
	)
}

export default LoginPass
