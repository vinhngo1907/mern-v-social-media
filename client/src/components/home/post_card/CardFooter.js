import React, { useEffect, useState } from "react";
import LikeButton from "../../other/LikeButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, savePost, unLikePost, unSavePost } from "../../../redux/actions/postAction";

const CardFooter = ({ post }) => {
    const [isLike, setIsLike] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);
    const [saved, setSaved] = useState(false);

    const { auth, socket } = useSelector(state => state);
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
        if (loadLike) return;

        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    }

    const handleUnLike = async () => {
        if (loadLike) return;

        setLoadLike(true);
        await dispatch(unLikePost({ post, auth }));
        setLoadLike(false)
    }

    // Save
    useEffect(() => {
        if (auth.user.saved.find(id => id === post._id)) {
            setSaved(true)
        } else {
            setSaved(false)
        }
    }, [auth.user.saved, post._id]);

    const handleSavePost = async () => {
        if (saveLoad) return;

        setSaveLoad(true)
        await dispatch(savePost({ post, auth }))
        setSaveLoad(false)
    }
    const handleUnSavePost = async () => {
        if (saveLoad) return;

        setSaveLoad(true)
        await dispatch(unSavePost({ post, auth }))
        setSaveLoad(false)
    }

    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div className="we-video-info d-flex align-items-center justify-content-between">
                    <span className="like" title={isLike ? "unlikes" : "likes"}>
                        <LikeButton
                            isLike={isLike}
                            handleLike={handleLike}
                            handleUnLike={handleUnLike}
                        />
                        <ins>{post.likes.length}</ins>
                    </span>

                    <span className="cmt" title="comments">
                        <Link to={`/post/${post._id}`} className="text-dark">
                            <i className="far fa-comment" />
                            <ins>{post.comments.length}</ins>
                        </Link>
                    </span>

                    <span className="share" title="share">
                        <i className="fa fa-share-alt" onClick={() => setIsShare(!isShare)} />
                    </span>
                    {/* <Link  to="#" onClick={() => setIsShare(!isShare)}  className="social-media">
                        <div className="social-menu">
                            <div className="btn trigger"><i className="fa fa-share-alt"></i></div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-html5"></i></Link></div>
                            </div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-facebook"></i></Link></div>
                            </div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-google-plus"></i></Link></div>
                            </div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-twitter"></i></Link></div>
                            </div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-css3"></i></Link></div>
                            </div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-instagram"></i></Link>
                                </div>
                            </div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-dribbble"></i></Link>
                                </div>
                            </div>
                            <div className="rotater">
                                <div className="btn btn-icon"><Link to="#" title=""><i className="fa fa-pinterest"></i></Link>
                                </div>
                            </div>

                        </div>
                    </Link> */}
                </div>
                <div className="we-video-info">
                    <span>
                        {
                            saved
                                ? <i className="fas fa-bookmark text-info"
                                    onClick={handleUnSavePost} />

                                : <i className="far fa-bookmark"
                                    onClick={handleSavePost} />
                        }</span>
                </div>
            </div>
            {/* <div className="d-flex justify-content-between">
                <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
                    {post.likes.length} likes
                </h6>

                <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
                    {post.comments.length} comments
                </h6>
            </div> */}

            {/* Share post */}
        </div>
    )
}

export default CardFooter;