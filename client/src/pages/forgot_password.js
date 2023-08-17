import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { forgotPassword } from "../redux/actions/userAction";

const ForgotPassord = () => {
    const [account, setAccount] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(account));
    }

    return (
        <div className="auth_page">
            <div className="auth_box" style={{ maxWidth: '550px' }}>
                <h2>Forgot Password?</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="account">Email / Phone Number</label>

                        <div className="d-flex align-items-center">
                            <input type="text"  className="form-control" id="account"
                                value={account}
                                onChange={(e)=> setAccount(e.target.value)}
                            />
                            <button className="btn btn-primary mx-2 d-flex align-items-center"
                                type="submit">
                                <i className="fas fa-paper-plane me-2" /> Send
                            </button>
                        </div>
                    </div>
                </form>
                <p>
                    {`You remembered your an account? `}
                    <Link to={`/login`} style={{ color: 'crimson' }}>
                        Login Now
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassord;