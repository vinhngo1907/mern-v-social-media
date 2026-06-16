// components/body/admin/PostManagement.js
import React, { useState, useEffect } from 'react';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all"); // all, reported, pending

    useEffect(() => {
        fetchPosts();
    }, [filter]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            // Replace with real API call later
            setPosts([
                {
                    _id: "p1",
                    title: "How to build a great social media app?",
                    author: "john_doe",
                    group: "React.js Developers",
                    status: "published",
                    reports: 0,
                    createdAt: "2026-06-10"
                },
                {
                    _id: "p2",
                    title: "This is a very inappropriate post!!!",
                    author: "bad_user",
                    group: "Football Lovers",
                    status: "reported",
                    reports: 12,
                    createdAt: "2026-06-12"
                },
                {
                    _id: "p3",
                    title: "Welcome to Cooking Club!",
                    author: "admin",
                    group: "Cooking Club",
                    status: "published",
                    reports: 0,
                    createdAt: "2026-06-08"
                },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this post?")) {
            console.log("Deleting post:", id);
            fetchPosts();
        }
    };

    const handleModerate = (id, action) => {
        console.log(`${action} post:`, id);
        fetchPosts();
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Post Management</h4>
                
                <div className="btn-group">
                    <button 
                        className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilter('all')}
                    >
                        All Posts
                    </button>
                    <button 
                        className={`btn ${filter === 'reported' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilter('reported')}
                    >
                        Reported
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Group</th>
                            <th>Status</th>
                            <th>Reports</th>
                            <th>Created</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="8" className="text-center">Loading...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan="8" className="text-center">No posts found</td></tr>
                        ) : (
                            posts.map(post => (
                                <tr key={post._id}>
                                    <td>{post._id}</td>
                                    <td style={{ maxWidth: "300px" }}>{post.title}</td>
                                    <td>{post.author}</td>
                                    <td>{post.group}</td>
                                    <td>
                                        <span className={`badge ${post.status === 'reported' ? 'bg-danger' : 'bg-success'}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td>{post.reports}</td>
                                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-info mx-1">View</button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger mx-1"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            Delete
                                        </button>
                                        {post.reports > 0 && (
                                            <button 
                                                className="btn btn-sm btn-warning mx-1"
                                                onClick={() => handleModerate(post._id, "Approve")}
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostManagement;