import React from "react";
// import Avatar from "../components/other/Avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { removeNotify, NOTIFY_TYPES } from "../redux/actions/notifyAction";
// import moment from "moment";
import LeftSideBar from "../components/global/LeftSideBar";
import { Link } from "react-router-dom";

const Images = () => {
    return (
        <div className="profile row">
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
                    <div className="post_thumb">
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683457124/v-media/profileImg_cven4n.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo5_jpcyas.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo2_fz8r83.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021030/v-media/photo4_g3lulp.jpg" alt="" />
                            </div>
                        </Link>

                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021030/v-media/photo1_zu5lxg.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021480/v-media/photo11_yfjb2y.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021480/v-media/photo13_qzblgw.jpg" alt="" />
                            </div>
                        </Link>

                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021481/v-media/photo-33_ux4e5h.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo12_d9tgln.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo8_a5sj2m.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo10_mkjl6i.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693022056/v-media/photo-99_t2timb.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo7_zz0djy.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1679677989/test/ispwvdjdqgkami7ndqha.jpg" alt="" />
                            </div>
                        </Link>
                        <Link className="strip" to="#" title="">
                            <div className="post_thumb_display">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1674274804/test/c6vrerzsuhnroq5czb6j.jpg" alt="" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Images;