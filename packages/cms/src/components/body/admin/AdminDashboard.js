// components/body/admin/AdminDashboard.js
import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import DashboardOverview from "./DashboardOverview";
import UserManagement from "./UserManagement";
import GroupManagement from "./GroupManagement";
import PostManagement from "./PostManagement";
// import RoleManagement from "./RoleManagement";
import CapacityManagement from "./CapacityManagement";

const AdminDashboard = () => {
    const { path } = useRouteMatch();

    return (
        <div className="container-fluid p-0">
            <div className="row no-gutters">
                {/* Sidebar */}
                <div className="col-3 col-lg-2 bg-dark text-white" style={{ minHeight: "100vh" }}>
                    <AdminSidebar />
                </div>

                {/* Main Content Area */}
                <div className="col-9 col-lg-10 p-4">
                    <Switch>
                        <Route path={`${path}`} exact component={DashboardOverview} />
                        <Route path={`${path}/users`} component={UserManagement} />
                        <Route path={`${path}/groups`} component={GroupManagement} />
                        <Route path={`${path}/posts`} component={PostManagement} />
                        {/* <Route path={`${path}/roles`} component={RoleManagement} /> */}
                        <Route path={`${path}/capacities`} component={CapacityManagement} />
                        <Route path={`${path}/policies`} component={() => <h2>Policies Management - Coming Soon</h2>} />
                        <Redirect to={`${path}`} />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;