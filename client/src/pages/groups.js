import React from "react";
import { Link } from "react-router-dom";

const Groups = () => {
    return (
        <div className="col-md-6 overlay-scrollbar scrollbar-hover">
            <div className="central-meta">
                <div className="groups">
                    <span><i className="fa fa-users" /> joined Groups</span>
                </div>
                <ul className="nearby-contct">
                    <li>
                        <div className="nearly-pepls">
                            <figure>
                                <Link to="time-line.html" title=""><img src="images/resources/group1.jpg" alt="" /></Link>
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
                                <Link href="time-line.html" title=""><img src="images/resources/group2.jpg" alt="" /></Link>
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
                                <Link href="time-line.html" title=""><img src="images/resources/group3.jpg" alt="" /></Link>
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
                                <Link href="time-line.html" title=""><img src="images/resources/group4.jpg" alt="" /></Link>
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
                                <Link href="time-line.html" title=""><img src="images/resources/group5.jpg" alt="" /></Link>
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
                                <Link href="time-line.html" title=""><img src="images/resources/group6.jpg" alt="" /></Link>
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
                                <Link href="time-line.html" title=""><img src="images/resources/group7.jpg" alt="" /></Link>
                            </figure>
                            <div className="pepl-info">
                                <h4><Link href="time-line.html" title="">Bachelor's fun</Link></h4>
                                <span>Public Group</span>
                                <em>500 Members</em>
                                <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="nearly-pepls">
                            <figure>
                                <Link href="time-line.html" title=""><img src="images/resources/group4.jpg" alt="" /></Link>
                            </figure>
                            <div className="pepl-info">
                                <h4><Link href="time-line.html" title="">Max Us</Link></h4>
                                <span>Public group</span>
                                <em> 756 Members</em>
                                <Link to="#" title="" className="add-butn" data-ripple="">leave group</Link>
                            </div>
                        </div>
                    </li>
                </ul>
                {/* <div className="lodmore"><button className="btn-view btn-load-more"></button></div> */}
            </div>
        </div>
    )
}

export default Groups