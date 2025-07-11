import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

const register = () =>{

    return (
        <div className="auth_page">
        <div className="auth_box">
          <h3 className="text-uppercase text-center mb-4">Register</h3>
  
          <RegisterForm />
          
          <p className="mt-2">
            {`Already have an account? `}
            <Link to='/login' style={{color: 'crimson'}}>
              Login Now
            </Link>
          </p>
  
        </div>
      </div>
    )
}

export default register;