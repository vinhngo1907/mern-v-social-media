import React from "react";
import LeftSideBar from "../components/global/LeftSideBar";

const AccountSettings = () => {
    return (
        <div className='home row mx-0'>
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>

            <div className="main_sidebar py-3 col-md-6">
                <div className="central-meta">
                    <div className="onoff-options">

                        <h5 className="f-title">
                            <i className="fas fa-cog" />
                            Account Setting
                        </h5>

                        <p>
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum.
                        </p>

                        <form method="post">

                            <div className="setting-row">
                                <span>Sub users</span>

                                <p>Enable this if you want people to follow you                                </p>

                                <input type="checkbox" id="switch00" />

                                <label
                                    htmlFor="switch00"
                                    data-on-label="ON"
                                    data-off-label="OFF"
                                />
                            </div>


                            <div className="setting-row">
                                <span>Enable follow me</span>

                                <p>
                                    Enable this if you want people to follow you
                                </p>

                                <input type="checkbox" id="switch01" />

                                <label
                                    htmlFor="switch01"
                                    data-on-label="ON"
                                    data-off-label="OFF"
                                />
                            </div>
                            <div className="setting-row">
                                <span>Send me notifications</span>
                                <p>Send me notification emails my friends like, share or message me</p>
                                <input type="checkbox" id="switch02" />
                                <label htmlFor="switch02" data-on-label="ON" data-off-label="OFF"></label>
                            </div>
                            <div className="setting-row">
                                <span>Text messages</span>
                                <p>Send me messages to my cell phone</p>
                                <input type="checkbox" id="switch03" />
                                <label htmlFor="switch03" data-on-label="ON" data-off-label="OFF"></label>
                            </div>
                            <div className="setting-row">
                                <span>Enable tagging</span>
                                <p>Enable my friends to tag me on their posts</p>
                                <input type="checkbox" id="switch04" />
                                <label htmlFor="switch04" data-on-label="ON" data-off-label="OFF"></label>
                            </div>

                            <div className="setting-row">
                                <span>Enable sound Notification</span>

                                <p>
                                    You'll hear notification sound when someone
                                    sends you a private message
                                </p>

                                <input
                                    type="checkbox"
                                    id="switch05"
                                    defaultChecked
                                />

                                <label
                                    htmlFor="switch05"
                                    data-on-label="ON"
                                    data-off-label="OFF"
                                />
                            </div>

                            <div className="submit-btns">
                                <button
                                    type="button"
                                    className="mtr-btn"
                                >
                                    <span>Cancel</span>
                                </button>

                                <button
                                    type="button"
                                    className="mtr-btn"
                                >
                                    <span>Update</span>
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;