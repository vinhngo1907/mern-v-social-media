import React, { useState } from "react";
import LikeButton from "../../other/LikeButton";
import { Link } from "react-router-dom";

const CardFooter = ({ post }) => {
    const [isLike, setIsLike] = useState(false);
    // const [isShare, setIsShare] = useState(false);
    const handleLike = () => {

    }

    const handleUnLike = () => {

    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <LikeButton
                        isLike={isLike}
                        handleLike={handleLike}
                        handleUnLike={handleUnLike}
                    />

                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>

                    {/* <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} /> */}
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
                    {post.likes.length} likes
                </h6>

                <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
                    {post.comments.length} comments
                </h6>
            </div>

            {/* Share post */}
        </div>
    )
}

export default CardFooter;