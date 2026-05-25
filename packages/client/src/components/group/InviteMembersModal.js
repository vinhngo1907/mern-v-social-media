import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inviteToGroup } from '../../redux/actions/groupAction';

const InviteMembersModal = ({ show, onHide, groupId }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Mock users for demo (replace with real search from API)
    const suggestedUsers = [
        { _id: "1", fullname: "Nguyen Van A", username: "vana", avatar: "..." },
        { _id: "2", fullname: "Tran Thi B", username: "thib", avatar: "..." },
    ];

    const toggleUser = (user) => {
        if (selectedUsers.find(u => u._id === user._id)) {
            setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleInvite = () => {
        if (selectedUsers.length === 0) return;

        dispatch(inviteToGroup(groupId, selectedUsers.map(u => u._id)));
        onHide();
        setSelectedUsers([]);
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Invite Members</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>

                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search friends..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <h6>Suggested Friends</h6>
                        <div className="list-group">
                            {suggestedUsers.map(user => (
                                <div
                                    key={user._id}
                                    className={`list-group-item list-group-item-action d-flex align-items-center ${selectedUsers.find(u => u._id === user._id) ? 'active' : ''}`}
                                    onClick={() => toggleUser(user)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={user.avatar} alt="" className="rounded-circle me-3" width="40" height="40" />
                                    <div>
                                        <strong>{user.fullname}</strong>
                                        <small className="d-block text-muted">@{user.username}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button
                            className="btn btn-primary"
                            onClick={handleInvite}
                            disabled={selectedUsers.length === 0}
                        >
                            Invite ({selectedUsers.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteMembersModal;