// import './styles/App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header/Header';
import Body from './components/body/Body';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchGetUser, dispatchLogin, fetchUser } from './redux/actions/authAction';
// import { refreshToken } from './redux/actions/authAction';
import axios from 'axios';

function App() {
	const { auth, token } = useSelector(state => state);
	const dispatch = useDispatch();
	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin')
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post('/api/auth/refresh-token', null)
				dispatch({ type: 'GET_TOKEN', payload: res.data.results.access_token })
			}
			getToken()
		}
	}, [auth.isLogged, dispatch])

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchLogin())

				return fetchUser(token).then(res => {
					dispatch(dispatchGetUser(res))
				})
			}
			getUser()
		}
	}, [token, dispatch])
	return (
		<Router>
			<div className="app">
				<Header />
				<Body />
			</div>
		</Router>
	)
}

export default App
