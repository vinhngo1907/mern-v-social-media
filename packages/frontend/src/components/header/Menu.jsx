import { use } from "react";

const Menu = () => {
    const dispatch = useDispatch();
    const navLiks = [
        { label: 'Home', icon: 'home', path: '/' },
        { label: 'Message', icon: 'near_me', path: '/message' },
        { label: 'Discover', icon: 'explore', path: '/discover' },
    ];

    const { pathname } = useLocation();
    const isActive = (pn) => {
        if (pn === pathname) return 'active';
    }
    
    return (
        <div className="menu">
            <ul className="navbar-nav flex-row">
                <li className="nav-item px-2 active">
                    <span className="material-icons menu-bar"
                        style={{ display: "none" }}>menu</span>
                </li>
            </ul>
        </div>
    )
}

export default Menu;