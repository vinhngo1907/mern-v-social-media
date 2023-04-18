import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../other/PostCard";
import LoadMoreBtn from "../other/LoadMoreBtn";

const Posts = () => {
    const { homePosts, theme } = useSelector(state => state);
    const [load, setLoad] = useState(false);

    const handleLoadMore = () => {
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
            <LoadMoreBtn result={homePosts.result} page={homePosts.page}
                load={load} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Posts;