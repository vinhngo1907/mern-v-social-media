import React from "react";
import Avatar from "../components/other/Avatar";

const Notifications = () => {
    return (
        <div className="notifications">
            <div className="col-md-6">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title"><i className="fas fa-bell"></i>All Notifications </h5>
                        <div className="notification-box">
                            <ul>
                                <li>
                                    <figure>
                                        <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1679677989/test/ispwvdjdqgkami7ndqha.jpg"
                                            size="big-avatar" />
                                    </figure>
                                    <div className="notifi-meta">
                                        <p>bob frank like your post</p>
                                        <span>30 mints ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure>
                                        <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1674274804/test/c6vrerzsuhnroq5czb6j.jpg"
                                            size="big-avatar" />
                                    </figure>
                                    <div className="notifi-meta">
                                        <p>Sarah Hetfield commented on your photo. </p>
                                        <span>1 hours ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure>
                                        <Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1683457124/v-media/profileImg_cven4n.jpg"
                                            size="big-avatar" /></figure>
                                    <div className="notifi-meta">
                                        <p>Mathilda Brinker commented on your new profile status. </p>
                                        <span>2 hours ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1683457061/v-media/user-avatar_b27qe1.jpg" size="big-avatar" /></figure>
                                    <div className="notifi-meta">
                                        <p>Green Goo Rock invited you to attend to his event Goo in Gotham Bar. </p>
                                        <span>2 hours ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1683457061/v-media/user-avatar2_atyzq8.jpg" size="big-avatar" /></figure>
                                    <div className="notifi-meta">
                                        <p>Chris Greyson liked your profile status. </p>
                                        <span>1 day ago</span>
                                    </div>
                                    <i className="del fa fa-close"></i>
                                </li>
                                <li>
                                    <figure><Avatar src="https://res.cloudinary.com/v-webdev/image/upload/v1683457123/v-media/p13_qlshae.jpg" size="big-avatar" /></figure>
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