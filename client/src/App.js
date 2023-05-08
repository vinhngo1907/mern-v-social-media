import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
import { getAllPosts } from "./redux/actions/postAction";
import Register from "./pages/register";
import { getAllNotifies } from "./redux/actions/notifyAction";
import ScrollTop from "./components/other/ScrollTop";

let scroll = 0;
function App() {
	const { auth, status } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshToken())
	}, [dispatch])

	useEffect(() => {
		if (auth.token) {
			dispatch(getAllPosts(auth.token));
			dispatch(getSuggestion(auth.token));
			dispatch(getAllNotifies(auth.token));
		}
	}, [auth.token, dispatch])
	
	window.addEventListener('scroll', () => {
		if (window.location.pathname === '/') {
			scroll = window.pageYOffset
			return scroll;
		}
	})

	// useEffect(() => {
	// 	console.log(scroll)
	// 	setTimeout(() => {
	// 		window.scrollTo({ top: scroll, behavior: 'smooth' })
	// 	}, 100)
	// }, [])

	return (
		<Router>
			<Alert />
			<input type="checkbox" id="theme" />
			<div className='App'>
				<div className="main">
					{auth.token && <Header />}
					{status && <StatusModal />}
					<Switch>
						<Route exact path="/" component={auth.token ? Home : Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />

						<PrivateRouter exact path="/:page" component={PageRender} />
						<PrivateRouter exact path="/:page/:id" component={PageRender} />
					</Switch>
				</div>
			</div>
			<ScrollTop scroll={scroll}/>
		</Router>
	)
}

export default App;
