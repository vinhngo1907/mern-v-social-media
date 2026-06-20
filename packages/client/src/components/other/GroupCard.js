import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import InviteMembersModal from "../group/InviteMembersModal";
import EditGroupModal from "../group/EditGroupModal";
import JoinRequestsPanel from '../../components/group/JoinRequestPanel';
import Avatar from "./Avatar";
import { leaveGroup } from "../../redux/actions/groupAction";

const GroupCard = ({ id, group, theme }) => {
    const [activeTab, setActiveTab] = useState('posts');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory()

    const { auth: { user, token } } = useSelector(state => state);

    // Check if current user is admin/manager of this group
    const isMember = group?.members?.some(m => m.user?._id === user?._id);
    const isAdminOrManager = group?.members?.some(
        member => member.user._id === user._id && ['admin', 'manager'].includes(member.role)
    );

    const handleLeaveGroup = async () => {
        if (!window.confirm("Are you sure about that?")) return;

        try {
            await dispatch(leaveGroup({ id, token }));
            return history.push("/groups");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="post container w-90">
            {/* Cover Image & Header */}
            <div className="group-cover position-relative">
                <img
                    src={group.avatar?.url || "https://res.cloudinary.com/v-webdev/image/upload/v1683554259/test/group-cover-default.jpg"}
                    alt="cover"
                    className="w-100"
                    style={{
                        height: '320px', objectFit: 'cover',
                        filter: theme ? 'invert(1)' : 'invert(0)'
                    }}
                />

                <div className="group-info-overlay p-4">
                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <h2 className="text-white fw-bold mb-1">{group.name}</h2>
                            <p className="text-white-50 mb-2">
                                {group.privacy === 'public' ? 'Public Group' :
                                    group.privacy === 'private' ? 'Private Group' : 'Secret Group'}
                                • {group.memberCount} members
                            </p>
                        </div>

                        <div>
                            {isAdminOrManager && (
                                <>
                                    <button
                                        className="btn btn-light me-2"
                                        onClick={() => setShowEditModal(true)}
                                    >
                                        <i className="fa fa-edit" /> Edit Group
                                    </button>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setShowInviteModal(true)}
                                    >
                                        <i className="fa fa-user-plus" /> Invite members
                                    </button>
                                </>
                            )}
                            {isMember && !isAdminOrManager && (
                                <button className="btn btn-outline-danger" onClick={handleLeaveGroup}>
                                    Leave Group
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="group-tabs border-bottom">
                <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            <i className="fa fa-newspaper" /> Posts
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                            onClick={() => setActiveTab('about')}
                        >
                            <i className="fa fa-info-circle" /> About
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'members' ? 'active' : ''}`}
                            onClick={() => setActiveTab('members')}
                        >
                            <i className="fa fa-users" /> Members
                        </button>
                    </li>

                    {/* Only show for Admin/Manager */}
                    {isAdminOrManager && (
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'requests' ? 'active' : ''}`}
                                onClick={() => setActiveTab('requests')}>
                                Join Requests
                            </button>
                        </li>
                    )}

                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'media' ? 'active' : ''}`}
                            onClick={() => setActiveTab('media')}
                        >
                            <i className="fa fa-images" /> Media
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="container mt-4">
                <div className="row">
                    {/* Left Content */}
                    <div className="col-lg-8">
                        {activeTab === 'posts' && (
                            <div>
                                <h5>Recent Posts</h5>
                                {/* You can put Post Feed component here later */}
                                <div className="text-center py-5 text-muted">
                                    No posts yet. Be the first to post something!
                                </div>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="card">
                                <div className="card-body">
                                    <h5>About this group</h5>
                                    <p>{group.description || "No description provided."}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'members' && (
                            <div>
                                <h5 className="mb-4">Members ({group.memberCount})</h5>
                                <div className="row">
                                    {group.members && group.members.length > 0 ? (
                                        group.members.map((member) => (
                                            <div key={member.user?._id} className="col-md-6 col-lg-4 mb-3">
                                                <div className="d-flex align-items-center p-3 border rounded">
                                                    <Avatar
                                                        src={member.user?.avatar}
                                                        size="big-avatar"
                                                    />
                                                    <div className="ms-3 flex-grow-1">
                                                        <h6 className="mb-1">
                                                            {member.user?.fullname || member.user?.username}
                                                        </h6>
                                                        <span className="badge bg-secondary">
                                                            {member.role}
                                                        </span>
                                                    </div>
                                                    {isAdminOrManager && member.user?._id !== user?._id && (
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No members found.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ==================== JOIN REQUESTS TAB ==================== */}
                        {/* {activeTab === 'requests' && isAdminOrManager && group?.joinRequests.length > 0 && (
                            <JoinRequestsPanel groupId={id} token={token} requests={group?.joinRequests} />
                        )} */}
                        {activeTab === 'requests' && isAdminOrManager && (
                            group?.joinRequests?.length > 0 ? (
                                <JoinRequestsPanel
                                    groupId={id}
                                    token={token}
                                    requests={group.joinRequests}
                                />
                            ) : (
                                <div className="text-center py-5">
                                    <i className="fas fa-user-clock fa-3x text-muted mb-3"></i>
                                    <h5 className="text-muted">No pending requests</h5>
                                    <p className="text-muted">
                                        There are currently no membership requests waiting for review.
                                    </p>
                                </div>
                            )
                        )}

                        {activeTab === 'media' && <div>Media Gallery Here</div>}

                        {activeTab === 'media' && (
                            <div>
                                <h5>Photos & Videos</h5>
                                {/* Media grid will go here */}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h6>Group Info</h6>
                                <ul className="list-unstyled">
                                    <li className="mb-2">
                                        <strong>Created by:</strong> {group.createdBy?.fullname || 'Unknown'}
                                    </li>
                                    <li className="mb-2">
                                        <strong>Visibility:</strong> {group.privacy}
                                    </li>
                                    <li>
                                        <strong>Type:</strong> {group.type}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditGroupModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                group={group}
            />

            <InviteMembersModal
                show={showInviteModal}
                onHide={() => setShowInviteModal(false)}
                groupId={id}
            />
        </div>
    )
}

export default GroupCard