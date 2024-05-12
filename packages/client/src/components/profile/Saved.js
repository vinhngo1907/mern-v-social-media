import React, { useEffect, useState } from "react";
import PostThumb from "../other/PostThumb";
import LoadMoreBtn from "../other/LoadMoreBtn";
import { getDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Saved = ({ auth, dispatch }) => {
    const [savePosts, setSavePosts] = useState([])
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(2);
    const [result, setResult] = useState(9);

    useEffect(() => {
        setLoad(true)
        getDataApi('post/user/save', auth.token)
        .then(res => {
            setSavePosts(res.data.results)
            setResult(res.data.results.length)
            setLoad(false)
        })
        .catch(err => {
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        })

        return () => setSavePosts([])
    },[auth.token, dispatch]);

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataApi(`post/user/save?limit=${page * 9}`, auth.token)
        setSavePosts(res.data.results)
        setResult(res.data.results.length)
        setPage(page + 1)
        setLoad(false)
    }

    return (
        <div>
            <PostThumb posts={savePosts} result={result} />

            {
                load && <div className="spinner-border text-dark d-block mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }


            <LoadMoreBtn result={result} page={page}
                load={load} handleLoadMore={handleLoadMore} />

        </div>
    )
}

export default Saved;