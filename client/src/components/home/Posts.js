import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../other/PostCard";

const Posts = () => {
    const { homePosts, theme } = useSelector(state => state);
    const [load, setLoad] = useState(false);

    const handleLoadMore=()=>{
        setLoad(true);
        setLoad(false);
    }

    return (
        <div className="posts">
            {
                homePosts.posts.map(post => (
                    <PostCard key={post._id} post={post} theme={theme} />
                ))
            }
            {
                load && <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            }
        </div>
    )
}

export default Posts;