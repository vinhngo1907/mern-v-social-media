// components/capacity/CapacityModal.js
import { useState, useEffect } from 'react';

const CapacityModal = ({
    show,
    mode = "create",
    currentCapacity,
    onClose,
    onSave
}) => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        resource: "",
        description: ""
    });

    useEffect(() => {
        if (currentCapacity && mode === "edit") {
            setFormData({
                name: currentCapacity.name || "",
                slug: currentCapacity.slug || "",
                resource: currentCapacity.resource || "",
                description: currentCapacity.description || ""
            });
        } else {
            setFormData({ name: "", slug: "", resource: "", description: "" });
        }
    }, [currentCapacity, mode]);

    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.name.trim() || !formData.slug.trim() || !formData.resource.trim()) {
            alert("Name, Slug, and Resource are required!");
            return;
        }
        onSave(formData);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {mode === "edit" ? "Edit Capacity" : "Create New Capacity"}
                        </h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Capacity Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Delete Any Post"
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Slug <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="e.g. delete_any_post"
                                />
                                <small className="text-muted">Lowercase with underscores</small>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Resource <span className="text-danger">*</span></label>
                            <select
                                className="form-select"
                                name="resource"
                                value={formData.resource}
                                onChange={handleChange}
                            >
                                <option value="">Select Resource</option>
                                <option value="group">Group</option>
                                <option value="post">Post</option>
                                <option value="comment">Comment</option>
                                <option value="user">User</option>
                                <option value="media">Media</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Optional description..."
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>
                            {mode === "edit" ? "Update Capacity" : "Create Capacity"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CapacityModal;