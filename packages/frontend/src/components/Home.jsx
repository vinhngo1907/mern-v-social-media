import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home row mx-0">
            <div className="col-md-8">
                <h3>Welcome to Transaction System</h3>
                <p>This is the dashboard. Use the link below to upload your CSV file.</p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Link to="/upload" className="btn btn-lg btn-primary uniform-btn">
                        📤 Upload CSV
                    </Link>
                    <Link to="/transactions" className="btn btn-lg btn-success uniform-btn">
                        👉 View Imported Transactions
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Home;