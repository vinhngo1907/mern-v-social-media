import React from "react";
// import Avatar from "../components/other/Avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { removeNotify, NOTIFY_TYPES } from "../redux/actions/notifyAction";
// import moment from "moment";
import LeftSideBar from "../components/global/LeftSideBar";
import { Link } from "react-router-dom";

const Images = () => {
    return (
        <div className="notifications row mx-0 ">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-8">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title">Explore Images</h5>
                    </div>
                    <ul className="photos">
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683475997/v-media/t9oylydkvuiime7lucty.jpg" alt="" />
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
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021030/v-media/photo1_zu5lxg.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021480/v-media/photo11_yfjb2y.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021480/v-media/photo13_qzblgw.jpg" alt="" /></Link>
                        </li>

                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021481/v-media/photo-33_ux4e5h.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo12_d9tgln.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo8_a5sj2m.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693021584/v-media/photo10_mkjl6i.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="#" title="">
                                <img src="https://res.cloudinary.com/v-webdev/image/upload/v1693022056/v-media/photo-99_t2timb.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="images/resources/photo-99.jpg" title="">
                                <img src="images/resources/photo12.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="images/resources/photo-66.jpg" title="">
                                <img src="images/resources/photo6.jpg" alt="" /></Link>
                        </li>
                        <li>
                            <Link className="strip" to="images/resources/photo-66.jpg" title="">
                                <img src="images/resources/photo13.jpg" alt="" /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Images;