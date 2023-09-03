import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/global/LeftSideBar";
import LoadMoreBtn from "../components/other/LoadMoreBtn";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { DISCOVER_VIDEOS_TYPES } from "../redux/actions/discoverAction";
// import { getDataApi } from "../utils/fetchData";
import ItemGallery from "../components/explore/ItemGallery";

const Videos = () => {
    const { auth, videos } = useSelector(state => state);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!videos.firstLoad) {
            // dispatch()
        }
    }, [auth.token, videos.firstLoad, dispatch]);

    const handleLoadMore = async () => {
        try {
            setLoad(true);
            // const res = await getDataApi()
            dispatch({ type: DISCOVER_VIDEOS_TYPES.LOADING, payload: false });
            setLoad(false);
        } catch (error) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.message || error } });
        }
    }

    return (
        <div className="home row mx-0 ">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-8">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title">Explore Videos</h5>
                    </div>
                    {
                        videos.loading ? <div className='d-block mx-auto text-dark spinner-border' role='status'>
                            <span className="sr-only">Loading...</span>
                        </div>
                            :
                            <ItemGallery items={videos.data} result={videos.result} />
                    }
                    {
                        load && <div className="spinner-border d-block mx-auto text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    {
                        !videos.loading
                        && <LoadMoreBtn load={load} page={videos.page} result={videos.result} handleLoadMore={handleLoadMore} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Videos;