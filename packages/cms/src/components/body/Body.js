import { useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import ForgotPassword from "./auth/ForgotPassword"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Home from "./home/Home"
import NotFound from "../utils/notound/NotFound";
import ActivationEmail from './auth/ActivationEmail';
import ResetPass from '../body/auth/ResetPassword';

import Profile from '../body/profile/Profile';
import EditUser from '../body/profile/EditUser';
import List from "./role/List"

function Body() {
    const { auth } = useSelector(state => state);
    const { isLogged, isAdmin } = auth;
    
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/forgot-password" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
                <Route path="/roles" component={isAdmin ? List : NotFound} exact />
            </Switch>
        </section>
    )
}

export default Body