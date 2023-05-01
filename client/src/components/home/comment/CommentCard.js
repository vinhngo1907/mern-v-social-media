import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../other/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import InputComment from '../InputComment';

const CommentCard = ({ children, comment, post, commentId }) => {
    console.log({comment})
    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false);
    const [onReply, setOnReply] = useState(false);

    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    return (
        <div className="comment_card mt-2" style={styleCard}>
            <Link to={`/profile/${comment?.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="small-avatar" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>

            <div className="comment_content">
                <div className="flex-fill"
                    style={{
                        filter: theme ? 'invert(1)' : 'invert(0)',
                        color: theme ? 'white' : '#111',
                    }}></div>
            </div>
            {
                onReply &&
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply} >
                    <Link to={`/profile/${onReply.user._id}`} className="mr-1">
                        @{onReply.user.username}:
                    </Link>
                </InputComment>
            }

            {children}
        </div>
    )
}

export default CommentCard;