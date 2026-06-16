// components/body/home/index.js
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const { auth } = useSelector(state => state);
    const { isLogged, isAdmin } = auth;

    return (
        <div className="home-page">
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-8">
                        <h1 className="display-4 fw-bold mb-4">
                            Welcome to <span className="text-primary">V-Net✮CMS</span>
                        </h1>
                        <p className="lead mb-5">
                            A modern social media platform with powerful admin tools, 
                            role-based access control, and community management.
                        </p>

                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            {!isLogged ? (
                                <>
                                    <Link to="/register" className="btn btn-primary btn-lg px-5">
                                        Get Started
                                    </Link>
                                    <Link to="/login" className="btn btn-outline-primary btn-lg px-5">
                                        Login
                                    </Link>
                                </>
                            ) : isAdmin ? (
                                <Link to="/admin" className="btn btn-success btn-lg px-5">
                                    Go to Admin Dashboard
                                </Link>
                            ) : (
                                <Link to="/profile" className="btn btn-primary btn-lg px-5">
                                    Go to Profile
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="row mt-5 g-4">
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4">
                            <h3>👥 Communities</h3>
                            <p>Build and manage powerful groups with role-based permissions.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4">
                            <h3>🔑 RBAC System</h3>
                            <p>Advanced Roles, Capacities, and Policies management.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4">
                            <h3>📊 Admin CMS</h3>
                            <p>Complete dashboard to manage users, content, and moderation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;