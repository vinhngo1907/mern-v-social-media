import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import {register} from '../redux/authSlice';
import RegisterForm from './auth/RegisterForm';

const Register = () => {
  const { auth } = useSelector(state => state);
  // const dispatch = useDispatch();
  const history = useNavigate();

  // const initialState = {
  //   email: '',
  //   password: '',
  //   cf_password: '',
  // };
  // const [userData, setUserData] = useState(initialState);
  // const {email, password, cf_password} = userData;

  // const [typePass, setTypePass] = useState(false);
  // const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) history('/');
  }, [auth.token, history]);

  // const handleChangeInput = e => {
  //   const {name, value} = e.target;
  //   setUserData({...userData, [name]: value});
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   dispatch(register(userData));
  // };

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center">Register</h3>
        <RegisterForm />
        <p className="mt-2">
          {`Already have an account? `}
          <Link to='/login' style={{ color: 'crimson' }}>
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
