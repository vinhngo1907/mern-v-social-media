import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const LoginSMS = () => {
    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(phone));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="phone" className="form-label">Phone number</label>
                <input type="text" className="form-control" id="phone" name="phone"
                    placeholder="+84374481936" value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button
                className="btn btn-dark w-100"
                disabled={phone ? false : true}>
                    Login
                </button>
        </form>
    )
}

export default LoginSMS;