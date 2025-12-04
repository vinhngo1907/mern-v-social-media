import {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import {refreshToken} from './redux/authSlice';
import Alert from './components/alert/Alert';
import PrivateRouter from './customRouter/PrivateRouter';
import Header from './components/header';
import Register from './components/Register';

function App() {
  const {auth, status} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

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
    </Router>
  );
}

export default App;
