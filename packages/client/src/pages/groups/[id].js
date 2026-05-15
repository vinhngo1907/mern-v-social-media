import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupById } from '../../redux/actions/groupAction';
import EditGroupModal from '../../components/group/EditGroupModal';
import InviteMembersModal from '../../components/group/InviteMembersModal';

const GroupDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('posts');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

    const { group, loading } = useSelector(state => state.groups); // We'll create this reducer
    const { user } = useSelector(state => state.auth);

    // Check if current user is admin/manager of this group
    const isAdmin = group?.members?.some(
        member => member.user._id === user._id && ['admin', 'manager'].includes(member.role)
    );

    useEffect(() => {
        if (id) {
            dispatch(getGroupById(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return <div className="text-center py-5">Loading group...</div>;
    }

    if (!group) {
        return <div className="text-center py-5">Group not found</div>;
    }

    return (
        <div className="group-detail">
            {/* Cover Image & Header */}
            <div className="group-cover position-relative">
                <img
                    src={group.coverImage || "https://res.cloudinary.com/v-webdev/image/upload/v1683554259/test/group-cover-default.jpg"}
                    alt="cover"
                    className="w-100"
                    style={{ height: '320px', objectFit: 'cover' }}
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
                            {isAdmin && (
                                <button
                                    className="btn btn-light me-2"
                                    onClick={() => setShowEditModal(true)}
                                >
                                    <i className="fa fa-edit"></i> Edit Group
                                </button>
                            )}

                            <button
                                className="btn btn-primary"
                                onClick={() => setShowInviteModal(true)}
                            >
                                <i className="fa fa-user-plus"></i> Invite
                            </button>
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
                            <i className="fa fa-newspaper"></i> Posts
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                            onClick={() => setActiveTab('about')}
                        >
                            <i className="fa fa-info-circle"></i> About
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'members' ? 'active' : ''}`}
                            onClick={() => setActiveTab('members')}
                        >
                            <i className="fa fa-users"></i> Members
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'media' ? 'active' : ''}`}
                            onClick={() => setActiveTab('media')}
                        >
                            <i className="fa fa-images"></i> Media
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
                                <h5>Members ({group.memberCount})</h5>
                                {/* Member list will go here */}
                            </div>
                        )}

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
    );
};

export default GroupDetail;