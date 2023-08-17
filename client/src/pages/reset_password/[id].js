import React from 'react'
// import { useParams } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
// import { resetPassword } from '../../redux/actions/userAction'

const ResetPassword = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="auth_page">
            <form className="auth_box" onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">
                    Reset Password
                </h3>

                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="pass">
                        <input type="text"
                            className="form-control"
                            id="password"
                            name="password"
                        />
                        <small>
                            Show
                        </small>
                    </div>
                </div>

                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <div className="pass">
                        <input type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            autoComplete='on'
                        />
                        <small > show
                        </small>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark w-100 mt-2">
                    Register
                </button>
            </form>
        </div>
    )
}

export default ResetPassword;
