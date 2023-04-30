import React, { useEffect, useState } from "react"

const Comments = ({post}) =>{
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2);
    const [replyComments, setReplyComments] = useState([])

    // useEffect(()=>{
    //     const newReply = post.comments
    // },[post.comments])
    return (
        <div className="comments">

        </div>
    )
}

export default Comments;