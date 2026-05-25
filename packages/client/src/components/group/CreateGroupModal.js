import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../redux/actions/groupAction';

const CreateGroupModal = ({ show, onHide }) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'community',
        privacy: 'private',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(createGroup({ data: formData, auth }));
            onHide();                    // Close modal after success
            setFormData({ name: '', description: '', type: 'community', privacy: 'private' });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create New Group</h5>
                            <button type="button" className="btn-close" onClick={onHide}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Group Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter group name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description <span className="text-danger">*</span></label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        placeholder="What is this group about?"
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Group Type</label>
                                        <select
                                            className="form-select"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                        >
                                            <option value="community">Community (Posts + Discussion)</option>
                                            <option value="chat">Chat Group Only</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Privacy</label>
                                        <select
                                            className="form-select"
                                            name="privacy"
                                            value={formData.privacy}
                                            onChange={handleChange}
                                        >
                                            <option value="public">Public - Anyone can see and join</option>
                                            <option value="private">Private - Approval needed to join</option>
                                            <option value="secret">Secret - Invite only</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onHide}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating...' : 'Create Group'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateGroupModal;