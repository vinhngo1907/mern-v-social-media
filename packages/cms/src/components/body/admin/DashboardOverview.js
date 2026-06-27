// components/body/admin/DashboardOverview.js
import React from 'react';

const DashboardOverview = () => {
    const stats = [
        { title: "Total Users", value: "1,248", change: "+12%", color: "primary" },
        { title: "Total Groups", value: "87", change: "+3%", color: "success" },
        { title: "Total Posts", value: "4,392", change: "-2%", color: "info" },
        { title: "Active Today", value: "392", change: "+18%", color: "warning" },
    ];

    const recentActivities = [
        { time: "2 min ago", action: "New user registered", user: "john_doe" },
        { time: "15 min ago", action: "Group 'Football Fans' created", user: "admin" },
        { time: "1 hour ago", action: "Post reported", user: "sarah_k" },
        { time: "3 hours ago", action: "Role 'Moderator' assigned", user: "admin" },
    ];

    return (
        <div>
            <h4 className="mb-4">Dashboard Overview</h4>

            {/* Stats Cards */}
            <div className="row mb-5">
                {stats.map((stat, index) => (
                    <div className="col-md-3 col-sm-6 mb-4" key={index}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h6 className="card-title text-muted">{stat.title}</h6>
                                <h3 className="mb-2">{stat.value}</h3>
                                <span className={`text-${stat.color}`}>
                                    {stat.change} from last week
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row">
                {/* Recent Activity */}
                <div className="col-lg-7 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <strong>Recent Activity</strong>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {recentActivities.map((activity, index) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                        <div>
                                            <strong>{activity.action}</strong>
                                            <br />
                                            <small className="text-muted">by {activity.user}</small>
                                        </div>
                                        <small className="text-muted">{activity.time}</small>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="col-lg-5 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <strong>Quick Actions</strong>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-lg" onClick={() => window.location.href = '/admin/roles'}>
                                    Manage Roles & Capacities
                                </button>
                                <button className="btn btn-success btn-lg" onClick={() => window.location.href = '/admin/users'}>
                                    Manage Users
                                </button>
                                <button className="btn btn-info btn-lg" onClick={() => window.location.href = '/admin/groups'}>
                                    Manage Groups
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;