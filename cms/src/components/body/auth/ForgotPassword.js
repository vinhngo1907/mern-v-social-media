import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ForgotPassword() {
    const {token} = useSelector(state=>state);
    const [account,setAccount] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await axios.post('api/auth/forgot-password',{account},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }
    return (
        <div className="my-4 m-auto" style={{ maxWidth: '500px' }}>
            <h2>Forgot Password?</h2>

            <form className="form-group" onSubmit={handleSubmit}>
                <label htmlFor="account">Email / Phone Number</label>

                <div className="d-flex align-items-center">
                    <input type="text" className="form-control" id="account"
                        name="account" onChange={e => setAccount(e.target.value)} />

                    <button className="btn btn-primary mx-2 d-flex align-items-center"
                        type="submit">
                        <i className="fas fa-paper-plane me-2" /> Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword;