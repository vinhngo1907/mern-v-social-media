import React from "react";
import { Link } from "react-router-dom";
import LeftSideBar from "../components/home/LeftSideBar";

const Groups = () => {
    return (
        <div className="row mx-auto">
            <div className="left_sidebar col-md-3">
				<LeftSideBar />
			</div>
            <div className="main_sidebar col-md-6 overlay-scrollbar scrollbar-hover">
                <div className="central-meta">
                    <div className="groups">
                        <span><i className="fa fa-users" /> joined Groups</span>
                    </div>
                    <ul className="nearby-contct">
                        <li>
                            <div className="nearly-pepls">
                                <figure>
                                    <Link to="time-line.html" title="">
                                        <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683554259/test/group1_s9buyc.jpg" alt="" />
                                    </Link>
                                </figure>
                                <div className="pepl-info">
                                    <h4><Link to="time-line.html" title="">funparty</Link></h4>
                                    <span>public group</span>
                                    <em>32k Members</em>
                                    <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="nearly-pepls">
                                <figure>
                                    <Link href="time-line.html" title="">
                                        <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683554260/test/group2_tytwqi.jpg" alt="" />
                                    </Link>
                                </figure>
                                <div className="pepl-info">
                                    <h4><Link href="time-line.html" title="">ABC News</Link></h4>
                                    <span>Private group</span>
                                    <em>5M Members</em>
                                    <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="nearly-pepls">
                                <figure>
                                    <Link href="time-line.html" title="">
                                        <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683554259/test/group3_vj1y7y.jpg" alt="" />
                                    </Link>
                                </figure>
                                <div className="pepl-info">
                                    <h4><Link href="time-line.html" title="">SEO Zone</Link></h4>
                                    <span>Public group</span>
                                    <em>32k Members</em>
                                    <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="nearly-pepls">
                                <figure>
                                    <Link href="time-line.html" title=""><img src="https://res.cloudinary.com/v-webdev/image/upload/v1683554259/test/group4_kck1ta.jpg" alt="" /></Link>
                                </figure>
                                <div className="pepl-info">
                                    <h4><Link href="time-line.html" title="">Max Us</Link></h4>
                                    <span>Public group</span>
                                    <em> 756 Members</em>
                                    <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="nearly-pepls">
                                <figure>
                                    <Link href="time-line.html" title="">
                                        <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683554259/test/group5_xb0jfl.jpg" alt="" />
                                    </Link>
                                </figure>
                                <div className="pepl-info">
                                    <h4><Link href="time-line.html" title="">Banana Group</Link></h4>
                                    <span>Friends Group</span>
                                    <em>32k Members</em>
                                    <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="nearly-pepls">
                                <figure>
                                    <Link href="time-line.html" title=""><img src="https://res.cloudinary.com/v-webdev/image/upload/v1683554260/test/group6_rzgamj.jpg" alt="" /></Link>
                                </figure>
                                <div className="pepl-info">
                                    <h4><Link href="time-line.html" title="">Bad boys n Girls</Link></h4>
                                    <span>Public group</span>
                                    <em>32k Members</em>
                                    <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="nearly-pepls">
                                <figure>
                                    <Link href="time-line.html" title=""><img src="https://res.cloudinary.com/v-webdev/image/upload/v1683554260/test/group7_d3b0jz.jpg" alt="" /></Link>
                                </figure>
                                <div className="pepl-info">
                                    <h4><Link href="time-line.html" title="">Bachelor's fun</Link></h4>
                                    <span>Public Group</span>
                                    <em>500 Members</em>
                                    <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="lodmore"><button className="btn-view btn-load-more"></button></div>
                </div>
            </div>
        </div>
    )
}

export default Groups;