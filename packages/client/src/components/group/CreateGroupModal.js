import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../redux/actions/groupAction';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const CreateGroupModal = ({ show, onHide }) => {
    const { auth: { token }, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const initialGroup = {
        name: '',
        description: '',
        type: 'community',
        privacy: 'private',
        chatPrivacy: 'private',
        settings: {
            allowAnyoneToInvite: false,
            requireApprovalToJoin: false,
            invitePermission: 'mod_and_above',
            requirePostApproval: false
        },
        publicLink: { enabled: false }
    }

    const [formData, setFormData] = useState(initialGroup);

    // Computed values
    const isCommunityType = formData.type === 'community' || formData.type === 'hybrid';
    // const isChatType = formData.type === 'chat';
    const showPostSettings = isCommunityType;
    // const showChatSettings = isChatType || formData.type === 'hybrid';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSettingsChange = (e) => {
        const { name, value, type, checked } = e.target;
        // console.log({ name, value, type, checked })
        setFormData({
            ...formData,
            settings: {
                ...formData.settings,
                [name]: type === 'checkbox' ? checked : value
            }
        });
    };

    const handlePublicLinkChange = (e) => {
        setFormData({
            ...formData,
            publicLink: { enabled: e.target.checked }
        });
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setFormData((prev) => ({
            ...prev,
            type: newType,
            settings: {
                ...prev.settings,
                requirePostApproval: newType === 'community' || newType === 'hybrid'
            }
        }))
    }
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        const err = checkImage(file);
        if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });

        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!avatar) {
            return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Group avatar is required" } });
        }

        setLoading(true);
        try {
            await dispatch(createGroup({ data: formData, token, avatar }));
            onHide();
            // Reset form
            setFormData({
                name: '', description: '', type: 'community',
                privacy: 'private', chatPrivacy: 'private',
                settings: { allowAnyoneToInvite: false, requireApprovalToJoin: false, invitePermission: 'mod_and_above' },
                publicLink: { enabled: false }
            });
            setAvatar(null);
            setAvatarPreview('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const handleClose = () => {
        setFormData(initialGroup);
        setAvatarPreview('https://res.cloudinary.com/v-webdev/image/upload/v1652077544/samples/cloudinary-group.jpg');
        // setMembers(group ? group.members : []);
        setAvatar(null);
        onHide();
    }

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content" style={{ maxHeight: '90vh' }}>   {/* ← Important */}

                    {/* Header */}
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Group</h5>
                        <button className="btn btn-danger btn_close" onClick={handleClose}>Close</button>
                    </div>

                    <div className="modal-body" style={{
                        maxHeight: 'calc(90vh - 120px)',
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}>
                        <form onSubmit={handleSubmit} id="createGroupForm">

                            {/* Avatar */}
                            <div className="group_avatar text-center">
                                <img
                                    src={avatarPreview || 'https://res.cloudinary.com/v-webdev/image/upload/v1652077544/samples/cloudinary-group.jpg'}
                                    alt="avatar"
                                    style={{
                                        width: '120px', height: '120px',
                                        objectFit: 'cover', borderRadius: '50%',
                                        filder: `${theme ? 'invert(0)' : 'invert(1)'}`
                                    }}
                                />
                                <div className="mt-2">
                                    <label className="btn btn-outline-primary btn-sm">
                                        <i className="fas fa-camera" /> Upload Avatar
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={handleChangeAvatar}
                                        />
                                    </label>
                                </div>
                            </div>

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
                                    rows="3"
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
                                    <select className="form-select form-control" name="type"
                                        value={formData.type}
                                        onChange={handleTypeChange}>
                                        <option value="community">Community (Posts + Discussion)</option>
                                        <option value="chat">Chat Group Only</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Privacy</label>
                                    <select className="form-select form-control"
                                        name="privacy" value={formData.privacy}
                                        onChange={handleChange}>
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        <option value="secret">Secret</option>
                                    </select>
                                </div>
                            </div>

                            {/* Settings Section */}
                            <h6 className="mt-4 mb-3 border-bottom pb-2">Group Settings</h6>

                            {/* Post-related settings - only for Community & Hybrid */}
                            {showPostSettings && (
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="requirePostApproval"
                                        checked={formData.settings.requirePostApproval}
                                        onChange={handleSettingsChange}
                                    />
                                    <label className="form-check-label">
                                        Require admin approval for new posts
                                    </label>
                                </div>
                            )}

                            {/* Common settings */}
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="allowAnyoneToInvite"
                                    checked={formData.settings.allowAnyoneToInvite}
                                    onChange={handleSettingsChange}
                                />
                                <label className="form-check-label form-label">
                                    Allow anyone to invite members
                                </label>
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="requireApprovalToJoin"
                                    checked={formData.settings.requireApprovalToJoin}
                                    onChange={handleSettingsChange}
                                />
                                <label className="form-check-label">Require approval to join</label>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Who can invite members?</label>
                                <select
                                    className="form-select form-control"
                                    name="invitePermission"
                                    value={formData.settings.invitePermission}
                                    onChange={handleSettingsChange}
                                >
                                    <option value="admin_only">Admin only</option>
                                    <option value="mod_and_above">Mods and above</option>
                                    <option value="anyone">Anyone in group</option>
                                </select>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={formData.publicLink.enabled}
                                    onChange={handlePublicLinkChange}
                                />
                                <label className="form-check-label">Enable public invite link</label>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="createGroupForm"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Group'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;