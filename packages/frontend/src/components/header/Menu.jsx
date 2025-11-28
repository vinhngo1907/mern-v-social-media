import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { GLOBALTYPES } from '../../redux/globalTypes';

const Menu = () => {
  const { auth, theme, sidebar
    //notify

  } = useSelector
  const dispatch = useDispatch();
  const navLiks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discover', icon: 'explore', path: '/discover' },
  ];

  const { pathname } = useLocation();
  const isActive = pn => {
    if (pn === pathname) return 'active';
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        <li className="nav-item px-2 active">
          <span
            className="material-icons menu-bar"
            style={{ display: 'none' }}
            onClick={() => dispatch({
              type: GLOBALTYPES.SIDEBAR,
              payload: !sidebar
            })}
          >            menu          </span>
        </li>
        {
          navLiks.map((link, index) => (
            <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
              <Link className="nav-link" to={link.path}>
                <span className="material-icons">{link.icon}</span>
              </Link>
            </li>
          ))
        }
        <li className="nav-item dropdown"
          style={{ opacity: 1 }}
        >
          <span className="nav-link position-relative" id="navbarDropdown"
            role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

            <span className="material-icons"
            // style={{color:}}
            >favorite</span>
            {/* <span className="notify_length">{notify.data.length}</span> */}

          </span>
          {/* <div id="notification-menu"
            className="dropdown-menu notification-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: 'translateX(75px)' }}>
            <NotifyModal />
          </div> */}
        </li>
      </ul>
    </div>
  );
};

export default Menu;
