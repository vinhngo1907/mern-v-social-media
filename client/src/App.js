import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home";
import Login from "./pages/login";
import Alert from "./components/alert/Alert";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/header/Header";

function App() {
	const { auth } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(refreshToken())
	}, [dispatch])
	
	return (
		<Router>
			 <Alert />
			<input type="checkbox" id="theme" />
			<div className='App'>
				<div className="main">
				{auth.token && <Header />}
					<Route exact path="/" component={auth.token ? Home : Login} />
					<Route exact path="/login" component={Login} />
					
				</div>
			</div>
		</Router>
	)
}

export default App;
