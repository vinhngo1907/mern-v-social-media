import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from "react-redux";
import Home from "./pages/home";
import Login from "./pages/login";

function App() {
	const { auth } = useSelector(state => state);

	return (
		<Router>
			<input type="checkbox" id="theme" />
			<div className='App'>
				<div className="main">
					<Route exact path="/" component={auth.token ? Home : Login} />
					<Route exact path="/login" component={Login} />
					
				</div>
			</div>
		</Router>
	)
}

export default App;
