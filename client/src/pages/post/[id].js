import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/actions/postAction";
import PostCard from "../../components/other/PostCard";

const Profile = () => {
    const { id } = useParams();
    const { auth, postDetail } = useSelector(state => state);
    const [post, setPost] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost({ postDetail, id, auth }))
        if (postDetail.length > 0) {
            const postArr = postDetail.filter(p => p._id === id);
            setPost(postArr);
        }
    }, [id, dispatch, auth, postDetail])

    return (
        <div className="posts container w-50">
            {
                post.length === 0 &&  <div className="mx-auto d-block spinner-border text-dark my-4">
                <span className="sr-only">Loading...</span>
            </div>
            }
            {
                post.map(p => (
                    <PostCard key={p._id} post={p} />
                ))
            }
        </div>
    )
}

export default Profile;