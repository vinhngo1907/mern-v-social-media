import React from 'react';
import { useDispatch, } from "react-redux";
import { joinGroup } from '../../redux/actions/groupAction';

const JoinGroupModal = ({ show, onHide, group, token }) => {
    const dispatch = useDispatch();

    if (!show || !group) return null;

    const handleJoin = () => {
        // Call your join API here
        console.log("Joining group:", group.name);
        dispatch(joinGroup({ id: group._id, token }));
        onHide();
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Join Group</h5>
                        {/* <button type="button" className="btn-close" onClick={onHide}></button> */}
                        <button
                            className="btn btn-danger btn_close"
                            onClick={onHide}
                        >
                            Close
                        </button>
                    </div>

                    <div className="modal-body text-center">
                        <img
                            src={group.avatar?.url || "/default-group.jpg"}
                            alt={group.name}
                            className="rounded-circle mb-3"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <h4>{group.name}</h4>
                        <p className="text-muted">{group.description || "No description available."}</p>

                        <div className="my-3">
                            <span className="badge bg-info me-2">{group.privacy}</span>
                            <span className="badge bg-secondary">{group.memberCount || 0} members</span>
                        </div>

                        {group.privacy === 'private' && (
                            <p className="text-warning small">
                                This is a private group. Your request to join needs to be approved by an admin.
                            </p>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleJoin}>
                            {group.privacy === 'public' ? 'Join Group' : 'Send Request'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinGroupModal;