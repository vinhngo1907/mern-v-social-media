import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ children }) => {
    const auth = useSelector(state => state.auth);

    return auth.token ? children : <Navigate to="/" />;
};

export default PrivateRouter;
