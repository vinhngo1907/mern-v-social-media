import { useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import ForgotPassword from "./auth/ForgotPassword"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Home from "./home/Home"
import NotFound from "../utils/notound/NotFound";

function Body() {
    const auth = useSelector(state => state.auth);
    const { isLogged } = auth;
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/forgot-password" component={isLogged ? NotFound : ForgotPassword} exact />
            </Switch>
        </section>
    )
}

export default Body