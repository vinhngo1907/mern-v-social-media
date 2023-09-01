import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../components/global/LeftSideBar";
// import { Link } from "react-router-dom";
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
            dispatch({ type: DISCOVER_IMAGES_TYPES.LOADING, payload: true });
            const res = await getDataApi(`upload/get?num=${medias.page}*9`, auth.token);
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
                    {/* <ul className="photos">
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683457124/v-media/profileImg_cven4n.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo5_jpcyas.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo2_fz8r83.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021030/v-media/photo4_g3lulp.jpg" alt="" />
                            </Link>
                        </li>

                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021030/v-media/photo1_zu5lxg.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021480/v-media/photo11_yfjb2y.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021480/v-media/photo13_qzblgw.jpg" alt="" />
                            </Link>
                        </li>

                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021481/v-media/photo-33_ux4e5h.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo12_d9tgln.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo8_a5sj2m.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo10_mkjl6i.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693022056/v-media/photo-99_t2timb.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo7_zz0djy.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1679677989/test/ispwvdjdqgkami7ndqha.jpg" alt="" />
                            </Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1674274804/test/c6vrerzsuhnroq5czb6j.jpg" alt="" />
                            </Link>
                        </li>
                    </ul> */}
                    {
                        medias.loading ? <div className='d-block mx-auto text-dark spinner-boder' role='status'>
                            <span className="sr-only">Loading...</span>
                        </div>
                            :
                            <ItemGallery images={medias.images} result={medias.result} />
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