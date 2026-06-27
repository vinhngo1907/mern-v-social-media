import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
    { to: "", label: "Dashboard", icon: "📊" },
    { to: "users", label: "Users", icon: "👥" },
    { to: "groups", label: "Groups", icon: "👥" },
    { to: "posts", label: "Posts", icon: "📝" },
    { to: "roles", label: "Roles & Permissions", icon: "🔑" },
    { to: "capacities", label: "Capacities", icon: "⚡" },
    { to: "policies", label: "Policies", icon: "📋" },
];

const AdminSidebar = () => {
    const base = "/admin";

    return (
        <div className="p-3">
            <h4 className="mb-4">CMS Dashboard</h4>
            <ul className="nav flex-column">
                {menuItems.map(item => (
                    <li className="nav-item mb-1" key={item.to}>
                        <NavLink
                            to={`${base}/${item.to}`}
                            exact
                            className="nav-link text-white"
                            activeClassName="active bg-primary"
                        >
                            <span className="me-2">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSidebar;