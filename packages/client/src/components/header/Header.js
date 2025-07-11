import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
// import { useDispatch, useSelector } from "react-redux";
// import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Header = () => {
    // const { sidebar } = useSelector(state => state);
    // const dispatch = useDispatch();

    return (
        <div className="header bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
                <Link to="/" className="logo position-relative">
                    {/* <i className="fas fa-bars text-dark position-absolute"
                        style={{ top: "33%", left: "5px", fontSize: "20px" }}
                        onClick={() => dispatch({ type: GLOBALTYPES.SIDEBAR, payload: !sidebar })} /> */}
                    <h1 className="navbar-brand text-uppercase p-0 m-0"
                        onClick={() => window.scrollTo({ top: 0 })}>
                        V-Network
                    </h1>
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>
    )
}

export default Header;