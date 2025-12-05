import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
// import {register} from '../redux/authSlice';
import RegisterForm from './auth/RegisterForm';

const Register = () => {
  const {auth} = useSelector(state => state);
  const history = useNavigate();

  useEffect(() => {
    if (auth.token) history('/');
  }, [auth.token, history]);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center">Register</h3>
        <RegisterForm />
        <p className="mt-2">
          {`Already have an account? `}
          <Link to="/login" style={{color: 'crimson'}}>
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
