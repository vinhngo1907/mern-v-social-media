import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {GLOBALTYPES} from '../../redux/globalTypes';
import {logout} from '../../redux/authSlice';
import Avatar from '../other/Avatar';
import NotifyModal from '../other/NotifyModal';

const Menu = () => {
  const auth = useSelector(state => state.auth);
  const notify = useSelector(state => state.notify);
  const theme = useSelector(state => state.theme);
  const sidebar = useSelector(state => state.sidebar);
  const dispatch = useDispatch();
  const navLinks = [
    {label: 'Home', icon: 'home', path: '/'},
    {label: 'Message', icon: 'near_me', path: '/message'},
    {label: 'Discover', icon: 'explore', path: '/discover'},
  ];

  const {pathname} = useLocation();
  const isActive = pn => {
    if (pn === pathname) return 'active';
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        <li className="nav-item px-2 active">
          <span
            className="material-icons menu-bar"
            style={{display: 'none'}}
            onClick={() =>
              dispatch({type: GLOBALTYPES.SIDEBAR, payload: !sidebar})
            }>
            menu
          </span>
        </li>
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className="nav-link" to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{opacity: 1}}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <span
              className="material-icons"
              style={{color: notify.data.length > 0 ? 'crimson' : ''}}>
              favorite
            </span>

            <span className="notify_length">{notify.data.length}</span>
          </span>

          <div
            id="notification-menu"
            className="dropdown-menu notification-menu"
            aria-labelledby="navbarDropdown"
            style={{transform: 'translateX(75px)'}}>
            <NotifyModal />
          </div>
        </li>
        <li className="nav-item dropdown" style={{opacity: 1}}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              <i className="fas fa-user-tie mr-2" />
              Profile
            </Link>

            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }>
              {theme ? (
                <i className="fas fa-sun light-icon mr-2" />
              ) : (
                <i className="fas fa-moon dark-icon mr-2" />
              )}
              {theme ? 'Light mode' : 'Dark mode'}
            </label>
            <Link className="dropdown-item" to="/change_password">
              <i className="fas fa-lock mr-2" />
              Change password
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout(auth.token))}>
              <i className="fas fa-sign-out-alt mr-2" />
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
