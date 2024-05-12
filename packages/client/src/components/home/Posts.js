import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../other/PostCard";
import LoadMoreBtn from "../other/LoadMoreBtn";
import { getDataApi } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const Posts = () => {
    const { homePosts, theme, auth } = useSelector(state => state);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataApi(`post?limit=${homePosts.page * 9}`, auth.token);
        dispatch({ type: POST_TYPES.GET_POSTS, payload: { posts: res.data.results.posts, result: res.data.results.result } });
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
                load && <div className="spinner-border text-primary mx-auto d-block" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            <LoadMoreBtn result={homePosts.result} page={homePosts.page}
                load={load} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Posts;