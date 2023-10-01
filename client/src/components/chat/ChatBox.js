import React from "react";
import Avatar from "../other/Avatar";

const ChatBox = () => {
    return (
        <div className="chat-box show">
            <div className="chat-head">
                <span className="status-chat f-online"></span>
                <h6>Bucky Barnes</h6>
                <div className="more">
                    <span><i className="fas fa-more" /></span>
                    <span className="close-mesage">
                        <i className="fas fa-times-circle" />
                    </span>
                </div>
            </div>
            <div className="chat-list">
                <ul className="ps-container ps-theme-default ps-active-y" id="948dd730-91eb-c0c1-7388-127bbe317177">
                    <li className="me">
                        <div className="chat-thumb">
                            <Avatar size="medium-avatar" src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo2_fz8r83.jpg" />
                        </div>
                        <div className="notification-event">
                            <span className="chat-message-item">
                                Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                            </span>
                            <span className="notification-date">
                                <time dateTime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time>
                            </span>
                        </div>
                    </li>
                    <li className="you">
                        <div className="chat-thumb">
                            <Avatar size="medium-avatar" src="https://res.cloudinary.com/v-webdev/image/upload/v1693021031/v-media/photo2_fz8r83.jpg" />
                        </div>
                        <div className="notification-event">
                            <span className="chat-message-item">
                                Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                            </span>
                            <span className="notification-date"><time datetime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                        </div>
                    </li>
                    <li className="me">
                        <div className="chat-thumb"><img src="images/resources/chatlist1.jpg" alt="" /></div>
                        <div className="notification-event">
                            <span className="chat-message-item">
                                Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks
                            </span>
                            <span className="notification-date"><time datetime="2004-07-24T18:18" className="entry-date updated">Yesterday at 8:10pm</time></span>
                        </div>
                    </li>
                    <div className="ps-scrollbar-x-rail" style={{ left: "0px", bottom: "0px" }}>
                        <div className="ps-scrollbar-x" tabindex="0" style={{ left: "0px", width: "0px" }}>
                        </div>
                    </div>
                    <div className="ps-scrollbar-y-rail" style={{ top: "0px", height: "290px", right: "0px" }}>
                        <div className="ps-scrollbar-y" tabindex="0" style={{ top: "0px", height: "189px" }}>
                        </div>
                    </div>
                </ul>
                <form className="text-box">
                    <textarea placeholder="Post enter to post..."></textarea>
                    <div className="add-smiles">
                        <span title="add icon" className="em em-expressionless"></span>
                    </div>
                    <div className="smiles-bunch">
                        <i className="em em---1"></i>
                        <i className="em em-smiley"></i>
                        <i className="em em-anguished"></i>
                        <i className="em em-laughing"></i>
                        <i className="em em-angry"></i>
                        <i className="em em-astonished"></i>
                        <i className="em em-blush"></i>
                        <i className="em em-disappointed"></i>
                        <i className="em em-worried"></i>
                        <i className="em em-kissing_heart"></i>
                        <i className="em em-rage"></i>
                        <i className="fas fa-stuck_out_tongue"></i>
                    </div>
                    <button type="submit"></button>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;