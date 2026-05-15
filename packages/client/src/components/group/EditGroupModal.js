import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGroup } from '../../redux/actions/groupAction';

const EditGroupModal = ({ show, onHide, group }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'community',
        privacy: 'private',
        chatPrivacy: 'private',
    });

    // Fill data when modal opens
    useEffect(() => {
        if (group) {
            setFormData({
                name: group.name || '',
                description: group.description || '',
                type: group.type || 'community',
                privacy: group.privacy || 'private',
                chatPrivacy: group.chatPrivacy || 'private',
            });
        }
    }, [group]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(updateGroup(group._id, formData));
            onHide();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!show || !group) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Group</h5>
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
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Group Type</label>
                                    <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                                        <option value="community">Community</option>
                                        <option value="chat">Chat Only</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Privacy</label>
                                    <select className="form-select" name="privacy" value={formData.privacy} onChange={handleChange}>
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        <option value="secret">Secret</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditGroupModal;