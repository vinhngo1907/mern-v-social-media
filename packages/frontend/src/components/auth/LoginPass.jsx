import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/authSlice';
import {Link} from 'react-router-dom';

const LoginPass = () => {
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState({
    account: '',
    password: '',
  });
  const [typePass, setTypePass] = useState(false);

  const {account, password} = userLogin;

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(userLogin));
  };

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setUserLogin({...userLogin, [name]: value});
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email/Username/Mobile</label>
          <input
            type="text"
            className="form-control"
            id="account"
            name="account"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={account}
          />

          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />

            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? 'Hide' : 'Show'}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={account && password ? false : true}>
          Login
        </button>

        <p className="my-2">
          You don't have an account?{' '}
          <Link to="/register" style={{color: 'crimson'}}>
            Register Now
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPass;
