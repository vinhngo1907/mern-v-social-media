import React, { useEffect, useState } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({ comment, post, replyCm }) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1);

    useEffect(() => {
        // console.log(replyCm)
        setShowRep(replyCm.slice(replyCm.length - next))
    }, [replyCm, next]);
    
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
                    {
                        replyCm.length - next > 0
                            ? <div style={{ cursor: 'pointer', color: 'crimson' }}
                                onClick={() => setNext(next + 10)}>
                                More comments...
                            </div>
                            : replyCm.length - next > 1 && <div style={{ cursor: 'pointer', color: 'crimson' }}
                                onClick={() => setNext(1)}>
                                Hide comments...
                            </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay;