import React from 'react';
import { useDispatch } from 'react-redux';
import { reviewJoinRequest } from '../../redux/actions/groupAction';
import Avatar from '../other/Avatar';

const JoinRequestsPanel = ({ group, token, requests }) => {
    // console.log({ group })
    // const { _id: groupId } = group;
    const dispatch = useDispatch();
    // const [requests, setRequests] = useState([]);
    // const { joinRequests: requests } = useSelector(state => state.groupDetail);
    // const [loading, setLoading] = useState(false);

    // const handleReview = async (requestId, status) => {
    const handleReview = async (request, status) => {
        const { _id: requestId } = request;
        if (!requestId) return;
        if (!window.confirm(`Are you sure you want to ${status} this request?`)) return;

        try {
            // setLoading(true);
            await dispatch(reviewJoinRequest({ request, status, group, token }));
        } catch (err) {
            console.error(err);
            // setLoading(false);
        }
        //     finally {
        //     setLoading(false);
        // }
    };

    // if (loading) return <div className="text-center py-4">Loading requests...</div>;

    if (!group || !token) return null;
    console.log({ group })

    return (
        <div className="join-requests-panel">
            <h5 className="mb-3">Pending Join Requests ({requests.length})</h5>

            {requests.length === 0 ? (
                <p className="text-muted text-center py-5">No pending requests</p>
            ) : (
                requests.map(req => (
                    <div key={req._id} className="d-flex align-items-center justify-content-between border-bottom py-3">
                        <div className="d-flex align-items-center">
                            <Avatar src={req.user.avatar?.url || req.user.avatar} size="big-avatar" />
                            <div className="ms-3">
                                <h6>{req.user.fullname || req.user.username}</h6>
                                <small className="text-muted">
                                    Requested {new Date(req.requestedAt).toLocaleDateString()}
                                </small>
                            </div>
                        </div>

                        <div>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => handleReview(req, 'approved')}
                            >
                                Approve
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleReview(req, 'rejected')}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default JoinRequestsPanel;