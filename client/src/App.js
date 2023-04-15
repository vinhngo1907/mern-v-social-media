import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/home";
import Login from "./pages/login";
import Alert from "./components/alert/Alert";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/header/Header";
import PrivateRouter from "./customRouter/PrivateRouter";
import PageRender from "./customRouter/PageRender";
import StatusModal from "./components/other/StatusModal";
import { getSuggestion } from "./redux/actions/suggestionAction";

function App() {
	const { auth, status } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshToken())
	}, [dispatch])

	useEffect(() => {
		if (auth.token) {
			dispatch(getSuggestion(auth.token))
		}
	}, [auth.token, dispatch])

	return (
		<Router>
			<Alert />
			<input type="checkbox" id="theme" />
			<div className='App'>
				<div className="main">
					{auth.token && <Header />}
					{status && <StatusModal />}
					<Route exact path="/" component={auth.token ? Home : Login} />
					<Route exact path="/login" component={Login} />
					<PrivateRouter exact path="/:page" component={PageRender} />
					<PrivateRouter exact path="/:page/:id" component={PageRender} />

				</div>
			</div>
		</Router>
	)
}

export default App;
