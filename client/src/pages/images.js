import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../components/global/LeftSideBar";
import { DISCOVER_IMAGES_TYPES, getDiscoverImages } from "../redux/actions/discoverAction";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import LoadMoreBtn from "../components/other/LoadMoreBtn";
import { getDataApi } from "../utils/fetchData";
import ItemGallery from "../components/explore/ItemGallery";

const Images = () => {
    const { auth, medias } = useSelector(state => state);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!medias.firstLoad) {
            dispatch(getDiscoverImages(auth.token));
        }
    }, [dispatch, auth.token, medias.firstLoad]);

    const handleLoadMore = async () => {
        try {
            setLoad(true);
            const res = await getDataApi(`upload/get?num=${medias.page}*9&nextPageCursor=${medias.nextPageCursor}`, auth.token);
            dispatch({ type: DISCOVER_IMAGES_TYPES.UPDATE_IMAGE, payload: res.data.results })
            setLoad(false);
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.message || err } });
        }
    }

    return (
        <div className="home row mx-0">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-9">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title">Explore Images</h5>
                    </div>
                    {
                        medias.loading
                            ? <div className='spinner-border d-block mx-auto text-dark' role='status'>
                                <span className="sr-only">Loading...</span>
                            </div>
                            : <ItemGallery items={medias.images} result={medias.result} />
                    }
                    {
                        load && <div className="spinner-border d-block mx-auto text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    {
                        !medias.loading
                        && <LoadMoreBtn load={load} page={medias.page} result={medias.result} handleLoadMore={handleLoadMore} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Images;