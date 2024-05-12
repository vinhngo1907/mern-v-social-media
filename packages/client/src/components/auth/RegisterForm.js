import React, { useState } from "react";

const RegisterForm = () => {
	const [typePass, setTypePass] = useState(false);
	const [typeCfPass, setTypeCfPass] = useState(false);
	const [data, setData] = useState({
		fullname: '', password: '', username: '', email: '', gender: 'male', cf_password: ''
	});

	const { fullname, password, username, email, cf_password } = data;
	const handleChangeInput = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	}
	const handleSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group mb-3">
				<label htmlFor="fullname" className="form-label">Full Name</label>

				<input type="text" className="form-control" id="fullname"
					name="fullname" value={fullname} onChange={handleChangeInput}
					placeholder="Your name is up to 25 chars." />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="username" className="form-label">username</label>

				<input type="text" className="form-control" id="username"
					name="username" value={username} onChange={handleChangeInput}
					placeholder="Your name is up to 20 chars." />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="email">Email address</label>
				<input type="email" className="form-control" id="email" name="email"
					aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={handleChangeInput} />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="password" className="form-label">Password</label>

				<div className="pass">
					<input type={typePass ? "text" : "password"}
						className="form-control"
						id="password"
						name="password" value={password}
						onChange={handleChangeInput}
						placeholder="Password must be at least 6 chars."
						autoComplete="on"
					/>

					<small onClick={() => setTypePass(!typePass)}>
						{typePass ? 'Hide' : 'Show'}
					</small>
				</div>
			</div>
			<div className="form-group mb-3">
				<label htmlFor="cf_password" className="form-label">
					Confirm Password
				</label>

				<div className="pass">
					<input type={typeCfPass ? "text" : "password"}
						className="form-control"
						id="cf_password"
						name="cf_password" value={cf_password}
						onChange={handleChangeInput}
						placeholder="Your confirm password."
						autoComplete="on"
					/>

					<small onClick={() => setTypeCfPass(!typeCfPass)}>
						{typeCfPass ? 'Hide' : 'Show'}
					</small>
				</div>
			</div>
			<div className="row justify-content-between mx-0 mb-1">
				<label htmlFor="male">
					Male: <input type="radio" id="male" name="gender"
						value="male" defaultChecked onChange={handleChangeInput} />
				</label>

				<label htmlFor="female">
					Female: <input type="radio" id="female" name="gender"
						value="female" onChange={handleChangeInput} />
				</label>

				<label htmlFor="other">
					Other: <input type="radio" id="other" name="gender"
						value="other" onChange={handleChangeInput} />
				</label>
			</div>
			<button type="submit" className="btn btn-dark w-100 my-1">Submit</button>
		</form>
	)
}

export default RegisterForm
