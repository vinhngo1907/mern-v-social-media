import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import moment from 'moment'
import Avatar from "../../other/Avatar";
import { BASE_URL } from "../../../utils/constants";
import { deletePost } from "../../../redux/actions/postAction";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

const CardHeader = ({ post }) => {
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();

    const history = useHistory();
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }
    
    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
    }

    const handleDeletePost = () => {
        if (window.confirm("Are you sure?")) {
            dispatch(deletePost({ post, auth, socket }))
            return history.push("/");
        }
    }
    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.user.avatar} size="big-avatar" />

                <div className="card_name">
                    <h6 className="m-0">
                        <Link to={`/profile/${post.user._id}`} className="text-dark">
                            {post.user.username}
                        </Link>
                    </h6>
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                {/* dropdown menu */}
                <div className="dropdown-menu">
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">create</span> Edit Post
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost} >
                                <span className="material-icons">delete_outline</span> Remove Post
                            </div>
                        </>
                    }
                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span> Copy Link
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHeader;