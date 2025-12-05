import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/authSlice';

const RegisterForm = () => {
  const {alert} = useSelector(state => state);
  const dispatch = useDispatch();
  const [userRegister, setUserRegister] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    cf_password: '',
  });

  const {email, fullname, username, password, cf_password} = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(userRegister));
  };
  const handleChangeInput = e => {
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="fullname" className="form-label">
          Full Name
        </label>

        <input
          type="text"
          id="fullname"
          className="form-control"
          value={fullname}
          name="fullname"
          onChange={handleChangeInput}
          placeholder="Full Name"
        />
        <small className="form-text text-danger">
          {alert.fullname ? alert.fullname : ''}
        </small>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="username" className="form-label">
          username
        </label>
        <input
          className="form-control"
          type="text"
          name="username"
          id="username"
          onChange={handleChangeInput}
          placeholder="Username"
          value={username}
        />
        <small className="form-text text-danger">
          {alert.username ? alert.username : ''}
        </small>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChangeInput}
        />
        <small className="form-text text-danger">
          {alert.email ? alert.email : ''}
        </small>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="pass">
          <input
            type={typePass ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChangeInput}
            autoComplete="on"
          />
          <small
            onClick={() =>
              setTypePass(!typePass)
            }>{`${typePass ? 'Hide' : 'Show'}`}</small>
        </div>
        <small className="form-text text-danger">
          {alert.password ? alert.password : ''}
        </small>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="cf_password" className="form-label">
          Confirm Password
        </label>
        <div className="pass">
          <input
            type={typeCfPass ? 'text' : 'password'}
            className="form-control"
            id="cf_password"
            name="cf_password"
            placeholder="Confirm Password"
            value={cf_password}
            onChange={handleChangeInput}
            autoComplete="on"
          />
          <small
            onClick={() =>
              setTypeCfPass(!typeCfPass)
            }>{`${typeCfPass ? 'Hide' : 'Show'}`}</small>
        </div>
        <small className="form-text text-danger">
          {alert.cf_password ? alert.cf_password : ''}
        </small>
      </div>
      <div className="row justify-content-between mx-0 mb-1">
        <label htmlFor="male">
          Male:{' '}
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            defaultChecked
            onChange={handleChangeInput}
          />
        </label>

        <label htmlFor="female">
          Female:{' '}
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleChangeInput}
          />
        </label>

        <label htmlFor="other">
          Other:{' '}
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={handleChangeInput}
          />
        </label>
      </div>
      <button type="submit" className="btn btn-dark w-100 my-1">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
