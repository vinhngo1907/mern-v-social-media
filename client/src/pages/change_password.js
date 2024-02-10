import React from "react";
import LeftSideBar from "../components/global/LeftSideBar";
import { Link } from "react-router-dom";

const ChangePassword = () => {
    return (
        <div className='home row mx-0'>
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-6">
                <div className="central-meta">
                    <div className="editing-info">
                        <h5 className="f-title">
                            <i className="fas fa-lock" />
                            Change Password
                        </h5>
                        <form>
                            <div className="form-group">
                                <input type="password" id="password" required="required" />
                                <label className="control-label" htmlFor="password">New password</label>
                                <i className="mtrl-select" />
                            </div>
                            <div className="form-group">
                                <input type="password" id="confirm-password" required="required" />
                                <label className="control-label" htmlFor="confirm-password">Confirm password</label>
                                <i className="mtrl-select" />
                            </div>
                            <div className="form-group">
                                <input type="password" required="required" id="current-pass" />
                                <label className="control-label" htmlFor="current-pass">Current password</label>
                                <i className="mtrl-select" />
                            </div>
                            <Link
                                className="forgot-pwd underline"
                                to="#">Forgot Password?
                            </Link>
                            <div className="submit-btns">
                                <button type="button" className="mtr-btn">
                                    <span>Cancel</span>
                                </button>
                                <button type="button" className="mtr-btn">
                                    <span>Update</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ChangePassword;