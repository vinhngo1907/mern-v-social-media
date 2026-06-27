import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../other/Avatar";
// import { GROUP_TYPES } from "../../redux/actions/groupAction";
// import { getDataApi } from "../../utils/fetchData";
// import LoadMoreBtn from "../other/LoadMoreBtn";

const ListGroup = ({
    groups = [],
    loading,
    isJoined,
    hasPendingRequest,
    onJoinClick,
    onLoadMore,
    hasMore
}) => {
    const [load, setLoad] = useState(false);

    const handleLoadMore = async () => {
        setLoad(true);
        try {
            await onLoadMore();
        } finally {
            setLoad(false);
        }
    };

    return (
        <>
            {
                groups.length === 0
                    ? (
                        <div className="text-center py-5 text-muted">
                            No groups found.
                        </div>
                    )
                    : (<ul className="nearby-contct">

                        {groups.map(group => {

                            const joined = isJoined(group._id);

                            const pending = hasPendingRequest(group);

                            return (

                                <li key={group._id}>

                                    <div className="nearly-pepls">

                                        <figure>

                                            <Link to={`/groups/${group._id}`}>

                                                <Avatar
                                                    size="large-avatar"
                                                    src={
                                                        group.avatar?.url ||
                                                        "/default-group.jpg"
                                                    }
                                                />

                                            </Link>

                                        </figure>

                                        <div className="pepl-info">

                                            <h4>

                                                <Link to={`/groups/${group._id}`}>

                                                    {group.name}

                                                </Link>

                                            </h4>

                                            <span>

                                                {group.privacy === "public"
                                                    ? "Public"
                                                    : "Private"}

                                                {" • "}

                                                {group.type}

                                            </span>

                                            <em>

                                                {group.memberCount || 0} members

                                            </em>

                                            {
                                                joined ? (

                                                    <Link
                                                        className="add-butn"
                                                        to={`/groups/${group._id}`}
                                                    >

                                                        View Group

                                                    </Link>

                                                ) : pending ? (

                                                    <button
                                                        disabled
                                                        className="add-butn btn-secondary"
                                                    >

                                                        <i className="fa fa-clock-o mr-1" />

                                                        Request Sent

                                                    </button>

                                                ) : (

                                                    <button
                                                        className="add-butn"
                                                        onClick={() =>
                                                            onJoinClick(group)
                                                        }
                                                    >

                                                        {
                                                            group.privacy === "public"
                                                                ? "Join Group"
                                                                : "Request to Join"
                                                        }

                                                    </button>

                                                )
                                            }

                                        </div>

                                    </div>

                                </li>

                            );

                        })}

                    </ul>)
            }
            {
                load && <div className="spinner-border text-dark d-block mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {
                hasMore && (
                    <div className="lodmore text-center mt-4">

                        <button
                            className="btn btn-light"
                            onClick={handleLoadMore}
                            disabled={load}
                        >
                            {
                                load
                                    ? "Loading..."
                                    : "Load More"
                            }
                        </button>

                    </div>
                )
            }

        </>

    );
};

export default React.memo(ListGroup);