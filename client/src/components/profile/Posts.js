import React, { useEffect, useState } from "react";
import LoadMoreBtn from "../other/LoadMoreBtn";
import PostThumb from "../other/PostThumb";
import { getDataApi } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";

const Posts = ({ auth, id, dispatch, profile }) => {
    const [posts, setPosts] = useState([]);
    const [result, setResult] = useState(9);
    const [page, setPage] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        profile.posts.forEach((p) => {
            if (p._id === id) {
                setPosts(p.posts);
                setResult(p.result);
                setPage(p.page)
            }
        })
    }, [profile.posts, id]);

    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataApi(`post/user/${id}?limit=${page * 9}`, auth.token);
        const newData = { ...res.data.results, page: page + 1, _id: id }
        dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData })
        setLoad(false);
    }
    return (
        <div>
            <PostThumb posts={posts} result={result} />
            {
                load && <div className="spinner-border text-dark d-block mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            <LoadMoreBtn handleLoadMore={handleLoadMore} result={result} load={load} page={page} />
        </div>
    )
}

export default Posts;