import { useSelector } from "react-redux"
import { Route, Switch } from "react-router-dom"
import ForgotPassword from "./auth/ForgotPassword"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Home from "./home";
import AdminDashboard from "./admin/AdminDashboard";
import NotFound from "../utils/notound/NotFound";
import ActivationEmail from './auth/ActivationEmail';
import ResetPass from './auth/ResetPassword';

import Profile from './profile/Profile';
import EditUser from './profile/EditUser';
import List from "./role"

function Body() {
    const { auth } = useSelector(state => state);
    const { isLogged, isAdmin } = auth;
    
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
                
                {/* Auth Routes */}
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/forgot-password" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                {/* Protected User Routes */}
                <Route path="/roles" component={isAdmin ? List : NotFound} exact />
                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                {/* ADMIN CMS ROUTES */}
                <Route path="/admin" component={isAdmin ? AdminDashboard : NotFound} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Body