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
                        <div className="widget">
                            <h5 className="widget-title">
                                <i className="fas fa-lock mr-2" />
                                Change Password
                            </h5>
                        </div>
                        <form>
                            <div className="form-group">
                                <input type="password" id="password" required="required" className="form-control"/>
                                <label className="control-label" htmlFor="password">New password</label><i className="mtrl-select"></i>
                            </div>
                            <div className="form-group">
                                <input type="password" required="required" id="confirm-pass" className="form-control"/>
                                <label className="control-label" htmlFor="confirm-pass">Confirm password</label><i className="mtrl-select"></i>
                            </div>
                            <div className="form-group">
                                <input type="password" required="required" id="current-pass" className="form-control"/>
                                <label className="control-label" htmlFor="current-pass">Current password</label><i className="mtrl-select"></i>
                            </div>
                            <Link
                                className="forgot-pwd underline"
                                to="#">Forgot Password?
                            </Link>
                            <div className="submit-btns">
                                <button type="button" className="mtr-btn"><span>Cancel</span></button>
                                <button type="button" className="mtr-btn"><span>Update</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ChangePassword;