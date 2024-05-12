import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchLogin } from '../../../redux/actions/authAction';
import { showErrMsg, showSuccessMsg } from '../../utils/notifications/Notification';

function LoginPass() {
    const dispatch = useDispatch();
    const history = useHistory();
    const initialState = {
        account: '',
        password: '',
        err: '',
        success: ''
    }
    const [userData, setUserData] = useState(initialState);
    const { account, password, err, success } = userData;
    const [pass, setPass] = useState(false);

    const handleInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post('/api/auth/login', { account, password });
            setUserData({ ...userData, err: '', success: res.data.message });
            localStorage.setItem('firstLogin', true);

            dispatch(dispatchLogin());
            history.push('/');
        } catch (err) {
            // console.log(err)
            if (err.response.data.message || err) {
                setUserData({ ...userData, err: err.response.data.message, success: '' });
                // setTimeout(() => {
                //     setUserData({ ...userData, err: '', success: '' })
                // }, 5000)
            }
        }
    }
    return (
        <>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="account">Email / Phone number</label>
                    <input type="text" className="form-control" id="account" aria-describedby="emailHelp"
                        placeholder="Example@gmail.com/+84374481936"
                        onChange={handleInput}
                        name="account"
                        value={account}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <div className='pass'>
                        <input type={pass ? 'text' : 'password'} className="form-control" id="password" placeholder="Password"
                            name="password"
                            onChange={handleInput}
                            value={password}
                        />
                        <small onClick={() => setPass(!pass)}>{pass ? 'Hide' : 'Show'}</small>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark w-100">Submit</button>
            </form>
        </>
    )
}

export default LoginPass