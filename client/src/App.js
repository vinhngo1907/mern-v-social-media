import React, { useEffect, useState } from "react";
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
import ScrollTop from "./components/other/ScrollTop";
import { getAllNotifies } from "./redux/actions/notifyAction";
import { getTotalStatistics } from "./redux/actions/statisticAction";
import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
// import { getSocialStatistics } from "./redux/actions/socialAction";
import Peer from "peerjs";
import CallModal from "./components/message/CallModal";
import ForgotPassord from "./pages/forgot_password";
import { getDiscoverImages } from "./redux/actions/discoverAction";
import { getDiscoverVideos } from "./redux/actions/videoAction";

let scroll = 0;
function App() {
	const { auth, status, call, modal } = useSelector(state => state);
	const dispatch = useDispatch();
	const [scrollTop, setScrollTop] = useState(0);

	useEffect(() => {
		dispatch(refreshToken());
		const socket = io();
		dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
		return () => socket.close();

	}, [dispatch]);

	useEffect(() => {
		if (auth.token) {
			dispatch(getAllPosts(auth.token));
			dispatch(getSuggestion(auth.token));
			dispatch(getAllNotifies(auth.token));
			// dispatch(getTotalStatistics(auth.token));
			// dispatch(getSocialStatistics(auth.token));
			dispatch(getDiscoverImages(auth.token));
			dispatch(getDiscoverVideos(auth.token));
		}
	}, [dispatch, auth.token]);

	useEffect(() => {
		if (auth.token && auth.user) {
			dispatch(getTotalStatistics(auth.token, auth.user));
		}
	}, [auth.token, dispatch, auth.user]);

	window.addEventListener('scroll', () => {
		if (window.location.pathname === '/') {
			scroll = window.pageYOffset;
			setScrollTop(window.pageYOffset);
			return scroll;
		}
	});

	// useEffect(() => {
	// 	console.log(scroll)
	// 	setTimeout(() => {
	// 		window.scrollTo({ top: scroll, behavior: 'smooth' })
	// 	}, 100)
	// }, []);

	useEffect(() => {
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification");
		}
		else if (Notification.permission === "granted") { }
		else if (Notification.permission !== "denied") {
			Notification.requestPermission().then(function (permission) {
				if (permission === "granted") { }
			});
		}
	}, []);

	useEffect(() => {
		const newPeer = new Peer(undefined, {
			path: '/', secure: true
		})

		dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
	}, [dispatch]);

	return (
		<Router>
			<Alert />
			<input type="checkbox" id="theme" />
			<div className={`App ${(status || modal) && 'mode'}`}>
				<div className="main">
					{auth.token && <Header />}
					{auth.token && <SocketClient />}
					{status && <StatusModal />}
					{call && <CallModal />}
					<Switch>
						<Route exact path="/" component={auth.token ? Home : Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/forgot_password" component={ForgotPassord} />

						<PrivateRouter exact path="/:page" component={PageRender} />
						<PrivateRouter exact path="/:page/:id" component={PageRender} />
					</Switch>
				</div>
			</div>

			{auth.token && <ScrollTop scroll={scrollTop} />}
		</Router>
	)
}

export default App;
