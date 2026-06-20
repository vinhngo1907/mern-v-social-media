import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inviteToGroup } from '../../redux/actions/groupAction';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { getDataApi } from '../../utils/fetchData';
import Avatar from '../other/Avatar';

const InviteMembersModal = ({ show, onHide, groupId }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const [search, setSearch] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Search users when typing
    useEffect(() => {
        if (search.length < 2) {
            setSuggestedUsers([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            try {
                // TODO: Call your search users API
                const res = await getDataApi(`user/search?name=${search}`, auth.token);

                setSuggestedUsers(res.data.results || []);

                // For now, keep mock or replace with real API call
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, auth.token]);

    const toggleUser = (user) => {
        if (selectedUsers.find(u => u._id === user._id)) {
            setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleInvite = async () => {
        if (selectedUsers.length === 0) return;

        setSubmitting(true);
        try {
            await dispatch(inviteToGroup(groupId, selectedUsers.map(u => u._id)));

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: `${selectedUsers.length} invitations sent successfully!` }
            });

            onHide();
            setSelectedUsers([]);
            setSearch('');
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const removeSelected = (userId) => {
        setSelectedUsers(selectedUsers.filter(u => u._id !== userId));
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content" style={{ maxHeight: '90vh' }}>

                    <div className="modal-header">
                        <h5 className="modal-title">Invite Members to Group</h5>
                        <button className="btn btn-danger btn_close" onClick={onHide}>Close</button>
                    </div>

                    <div className="modal-body" style={{
                        maxHeight: 'calc(90vh - 180px)',
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}>

                        {/* Selected Users */}
                        {selectedUsers.length > 0 && (
                            <div className="mb-3">
                                <h6>Selected ({selectedUsers.length})</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {selectedUsers.map(user => (
                                        <div key={user._id} className="badge bg-primary d-flex align-items-center gap-1 p-2">
                                            <Avatar
                                                src={user.avatar}
                                                alt="avatar"
                                                // className="rounded-circle" 
                                                // width="24" height="24"
                                                size="medium-avatar"
                                            />
                                            <span>{user.fullname}</span>
                                            <button
                                                className="btn-close btn-close-white ms-1"
                                                style={{ fontSize: '10px' }}
                                                onClick={() => removeSelected(user._id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Search Input */}
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search friends by name or username..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Suggested Users */}
                        <h6 className="mb-3">Suggested Friends</h6>

                        {loading ? (
                            <p className="text-center text-muted">Searching...</p>
                        ) : suggestedUsers.length === 0 && search.length > 1 ? (
                            <p className="text-center text-muted">No users found</p>
                        ) : (
                            <div className="suggestions px-2">
                                {(suggestedUsers.length > 0 ? suggestedUsers : []).map(user => (
                                    <div
                                        key={user._id}
                                        className={`list-group-item list-group-item-action d-flex align-items-center ${selectedUsers.find(u => u._id === user._id) ? 'active' : ''}`}
                                        onClick={() => toggleUser(user)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className='d-flex'>
                                            <img
                                                alt="avatar"
                                                src={user.avatar}
                                                style={{
                                                    width: "50%", height: "5%", objectFit: 'cover',

                                                }}

                                            />
                                            <div className="flex-grow-1">
                                                <strong>{user.fullname}</strong>
                                                <small className="d-block text-muted">@{user.username}</small>
                                            </div>
                                        </div>

                                        <button
                                            className={`btn btn-sm ${selectedUsers.find(u => u._id === user._id) ? 'btn-danger' : 'btn-primary'}`}
                                        >
                                            {selectedUsers.find(u => u._id === user._id) ? 'Deselect' : 'Select'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button
                            className="btn btn-primary"
                            onClick={handleInvite}
                            disabled={selectedUsers.length === 0 || submitting}
                        >
                            {submitting ? 'Sending...' : `Invite (${selectedUsers.length})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteMembersModal;