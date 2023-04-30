import React, { useState } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({ comment, post, replyCm }) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)
    return (
        <div className="comment_display">
            <CommentCard comment={comment} post={post} commentId={comment._id} >
                <div className="pl-4">
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                                key={index}
                                comment={item}
                                post={post}
                                commentId={comment._id}
                            />
                        ))
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay;