import React, { useEffect, useState } from "react";
import LikeButton from "../../other/LikeButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unLikePost } from "../../../redux/actions/postAction";

const CardFooter = ({ post }) => {
    const [isLike, setIsLike] = useState(false);
    // const [isShare, setIsShare] = useState(false);
    // const [isSaved, setIsSaved] = useState(false);
    // const [loadLike, setLoadLike] = useState(false);

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    // likes
    useEffect(() => {
        if (post.likes.find(p => p._id === auth.user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user._id])

    const handleLike = async () => {
        // if (loadLike) return;

        // setLoadLike(true)
        // console.log("asdasd")
        await dispatch(likePost({ post, auth }))
        // setIsLike(false);
    }

    const handleUnLike = async () => {
        // if(loadLike) return;

        // setLoadLike(true)
        // console.log("asdasd")
        await dispatch(unLikePost({ post, auth }));
        // setIsLike(false)
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