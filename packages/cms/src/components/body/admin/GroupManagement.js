// components/body/admin/GroupManagement.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import your redux actions when ready
// import { fetchAllGroups, dispatchGetAllGroups } from '../../../redux/actions/groupAction';

const GroupManagement = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    // const dispatch = useDispatch();
    // const { token } = useSelector(state => state);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        setLoading(true);
        try {
            // const res = await fetchAllGroups(token);
            // dispatch(dispatchGetAllGroups(res));

            // Mock data for now
            setGroups([
                {
                    _id: "1",
                    name: "Football Lovers",
                    slug: "football-lovers",
                    members: 1240,
                    privacy: "public",
                    createdAt: "2026-05-10"
                },
                {
                    _id: "2",
                    name: "React.js Developers",
                    slug: "reactjs-dev",
                    members: 856,
                    privacy: "private",
                    createdAt: "2026-06-01"
                },
                {
                    _id: "3",
                    name: "Cooking Club",
                    slug: "cooking-club",
                    members: 432,
                    privacy: "public",
                    createdAt: "2026-04-15"
                },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this group?")) {
            console.log("Deleting group:", id);
            // dispatch(deleteGroup(id, token));
            fetchGroups();
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Group Management</h4>
                <button className="btn btn-primary">+ Create New Group</button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Group Name</th>
                            <th>Slug</th>
                            <th>Members</th>
                            <th>Privacy</th>
                            <th>Created</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center">Loading...</td></tr>
                        ) : groups.length === 0 ? (
                            <tr><td colSpan="7" className="text-center">No groups found</td></tr>
                        ) : (
                            groups.map(group => (
                                <tr key={group._id}>
                                    <td>{group._id}</td>
                                    <td>{group.name}</td>
                                    <td>{group.slug}</td>
                                    <td>{group.members}</td>
                                    <td>
                                        <span className={`badge ${group.privacy === 'public' ? 'bg-success' : 'bg-warning'}`}>
                                            {group.privacy}
                                        </span>
                                    </td>
                                    <td>{new Date(group.createdAt).toLocaleDateString()}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-primary mx-1">Edit</button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger mx-1"
                                            onClick={() => handleDelete(group._id)}
                                        >
                                            Delete
                                        </button>
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

export default GroupManagement;