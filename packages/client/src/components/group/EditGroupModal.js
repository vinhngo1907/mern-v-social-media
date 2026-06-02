import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { promoteToAdmin, removeMember, updateGroup } from '../../redux/actions/groupAction';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const EditGroupModal = ({ show, onHide, group }) => {
    const { auth: { token, user }, theme, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [members, setMembers] = useState([]);
    const initialGroup = {
        name: '',
        description: '',
        type: 'community',
        privacy: 'private',
        chatPrivacy: 'private',
    }

    const [formData, setFormData] = useState(initialGroup);

    // Fill data when modal opens
    useEffect(() => {
        if (group && show) {
            setFormData({
                name: group.name || '',
                description: group.description || '',
                type: group.type || 'community',
                privacy: group.privacy || 'private',
                chatPrivacy: group.chatPrivacy || 'private',
            });

            setAvatarPreview(group.avatar || '/default-group.png');
            setMembers(group.members || []);
            setAvatar(null);
        }
    }, [group, show]);

    //   const isAdmin = () => group?.memebers?.map(a => a._id || a).includes(auth.user._id);
    const isAdmin = () => group?.members?.map(u => u._id).includes(user._id);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAdmin) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Only admins can edit group settings" } })
        setLoading(true);

        if (!group.name.trim()) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Group name required' }
            });
        }

        try {
            await dispatch(updateGroup({ groupId: group._id, token, data: formData, avatar, socket }));
            handleClose();
        } finally {
            setLoading(false);
        }
    };

    if (!show || !group) return null;

    const handleChangeAvatar = (e) => {
        e.preventDefault();
        if (!isAdmin) {
            return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Only admins can edit group settings" } })
        }

        const file = e.target.files[0];
        const err = checkImage(file);
        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });

        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    }

    const handlePromoteDemote = async (memberId) => {
        await dispatch(promoteToAdmin({ groupId: group._id, memberId, token }));
    };

    const handleRemoveMember = async (memberId) => {
        if (window.confirm('Remove this member?')) {
            await dispatch(removeMember({ groupId: group._id, memberId, token }));
        }
    };
    const handleClose = () => {
        setFormData(initialGroup);
        setAvatarPreview(group.avatar?.url || '/default-group.png');
        setMembers(group ? group.members : []);
        setAvatar(null);
        onHide();
    }
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                {/* ↑↑↑ This is the key: modal-dialog-scrollable */}
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Group</h5>
                        {/* <button type="button" className="btn-close" onClick={onHide}></button> */}
                        <button
                            className="btn btn-danger btn_close"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="group_avatar">
                                <img src={avatarPreview}
                                    alt="avatar" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                                <span>
                                    <i className="fas fa-camera" />
                                    <p>Change</p>
                                    <input type="file" name="file" id="file_up"
                                        accept="image/*" onChange={handleChangeAvatar} />
                                </span>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Group Name <span className="text-danger">*</span></label>
                                <input
                                    type="text" className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className='font-weight-bold'>Members</label>
                                <div className="members-scroll">
                                    {members.map(member => (
                                        <div key={member.user._id} className="member-item d-flex align-items-center justify-content-between py-2 border-bottom">
                                            <div>
                                                <span>{member.user.fullname || member.user.username}</span>
                                                {
                                                    group?.members?.some(a => (a._id || a) === member._id)
                                                    && <span className="badge badge-primary ml-2">Admin</span>}
                                            </div>
                                            <div>
                                                <button className="btn btn-sm btn-outline-info mr-2" onClick={() => handlePromoteDemote(member._id)}>
                                                    {group?.members?.some(a => (a._id || a) === member._id) ? 'Demote' : 'Promote'}
                                                </button>
                                                {member._id !== user._id && (
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveMember(member._id)}>Remove</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6 mb-3">
                                    <label className="form-label">Group Type</label>
                                    <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                                        <option value="community">Community</option>
                                        <option value="chat">Chat Only</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Privacy</label>
                                    <select className="form-select"
                                        name="privacy" value={formData.privacy}
                                        onChange={handleChange}>
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                        <option value="secret">Secret</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button" className="btn btn-secondary"
                                onClick={handleClose}>Cancel</button>
                            <button
                                type="submit"
                                className="btn btn-primary" disabled={loading}
                            >
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