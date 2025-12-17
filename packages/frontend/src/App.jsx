import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import { refreshToken } from './redux/authSlice';
import Alert from './components/alert/Alert';
import PrivateRouter from './customRouter/PrivateRouter';
import Header from './components/header';
import Register from './components/Register';
import { getSuggestion } from './redux/suggestionSlice';
import ScrollTop from './components/other/ScrollTop';

function App() {
  const { auth, status } = useSelector(state => state);
  const [scrollTop, setScrollTop] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getSuggestion(auth.token));
    }
  }, [dispatch, auth.token]);

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset;
      setScrollTop(window.pageYOffset);
      return scroll;
    }
  });

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      });
    }
  }, []);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${status && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={auth.token ? <Home /> : <Login />} />

            {/* Private Routes */}
            {/* <Route
              path="/upload"
              element={
                <PrivateRouter>
                  <Images />
                </PrivateRouter>
              }
            /> */}
            {/* <Route
              path="/transactions"
              element={
                <PrivateRouter>
                  <Transactions />
                </PrivateRouter>
              }
            /> */}
          </Routes>
        </div>
      </div>
      {auth.token && <ScrollTop scroll={scrollTop}/>}
    </Router>
  );
}

export default App;
