// components/body/admin/CapacityManagement.js
import React, { useState, useEffect } from 'react';
import CapacityModal from '../capacity/CapacityModal';


const CapacityManagement = () => {
    const [capacities, setCapacities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCapacity, setEditingCapacity] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch capacities from API
    useEffect(() => {
        fetchCapacities();
    }, []);

    const fetchCapacities = async () => {
        setLoading(true);
        try {
            // Replace with your real API call
            // const res = await axios.get('/api/capacities');
            // setCapacities(res.data);

            // Mock data for now
            setCapacities([
                { _id: "1", name: "View Group", slug: "view_group", resource: "group", description: "Can view group details" },
                { _id: "2", name: "Create Post", slug: "create_post", resource: "group", description: "" },
                { _id: "3", name: "Delete Any Post", slug: "delete_any_post", resource: "post" },
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setEditingCapacity(null);
        setShowModal(true);
    };

    const openEditModal = (capacity) => {
        setEditingCapacity(capacity);
        setShowModal(true);
    };

    const handleSave = async (formData) => {
        try {
            if (editingCapacity) {
                // Update existing
                console.log("Updating capacity:", formData);
                // await axios.put(`/api/capacities/${editingCapacity._id}`, formData);
            } else {
                // Create new
                console.log("Creating capacity:", formData);
                // await axios.post('/api/capacities', formData);
            }
            fetchCapacities(); // Refresh list
            setShowModal(false);
        } catch (error) {
            alert("Failed to save capacity");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this capacity?")) return;
        try {
            console.log("Deleting capacity:", id);
            // await axios.delete(`/api/capacities/${id}`);
            fetchCapacities();
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Capacities Management</h4>
                <button className="btn btn-primary" onClick={openCreateModal}>
                    + New Capacity
                </button>
            </div>

            <div className="card">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Resource</th>
                                <th>Description</th>
                                <th style={{ width: "150px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center">Loading...</td></tr>
                            ) : capacities.length === 0 ? (
                                <tr><td colSpan="5" className="text-center">No capacities found</td></tr>
                            ) : (
                                capacities.map(cap => (
                                    <tr key={cap._id}>
                                        <td>{cap.name}</td>
                                        <td><code>{cap.slug}</code></td>
                                        <td><span className="badge bg-secondary">{cap.resource}</span></td>
                                        <td>{cap.description || "-"}</td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() => openEditModal(cap)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(cap._id)}
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

            <CapacityModal
                show={showModal}
                mode={editingCapacity ? "edit" : "create"}
                currentCapacity={editingCapacity}
                onClose={() => setShowModal(false)}
                onSave={handleSave}
            />
        </div>
    );
};

export default CapacityManagement;