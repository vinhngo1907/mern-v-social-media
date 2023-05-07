import React from "react";

const Notifications = () => {
    return (
        <div className="notifications">
            <div className="col-lg-6">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title"><i className="ti-bell"></i>All Notifications </h5>
                        <div className="notification-box">
                            <ul>
                                <li>
                                    <figure><img src="images/resources/friend-avatar.jpg" alt="" /></figure>
                                    <div className="notifi-meta">
                                        <p>bob frank like your post</p>
                                        <span>30 mints ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><img src="images/resources/friend-avatar2.jpg" alt="" /></figure>
                                    <div className="notifi-meta">
                                        <p>Sarah Hetfield commented on your photo. </p>
                                        <span>1 hours ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><img src="images/resources/friend-avatar3.jpg" alt="" /></figure>
                                    <div className="notifi-meta">
                                        <p>Mathilda Brinker commented on your new profile status. </p>
                                        <span>2 hours ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><img src="images/resources/friend-avatar4.jpg" alt="" /></figure>
                                    <div className="notifi-meta">
                                        <p>Green Goo Rock invited you to attend to his event Goo in Gotham Bar. </p>
                                        <span>2 hours ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><img src="images/resources/friend-avatar5.jpg" alt="" /></figure>
                                    <div className="notifi-meta">
                                        <p>Chris Greyson liked your profile status. </p>
                                        <span>1 day ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><img src="images/resources/friend-avatar6.jpg" alt="" /></figure>
                                    <div className="notifi-meta">
                                        <p>You and Nicholas Grissom just became friends. Write on his wall. </p>
                                        <span>2 days ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications