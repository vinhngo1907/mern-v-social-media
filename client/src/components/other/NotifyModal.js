import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import Avatar from './Avatar';

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch();

    return (
        <div style={{ minWidth: '300px' }}>
            <div className="dropdown-menu-header px-3">
                <span>
                    Notifications
                </span>
            </div>
            <hr className="mt-0" />
            {/* {
                notify.data.length === 0 &&
                <img src={NoNotice} alt="NoNotice" className="w-100" />
            } */}

            <div className="dropdown-menu-content overlay-scrollbar scrollbar-hover">
                {
                    notify.data.map((noti, index) => (
                        <div className="dropdown-menu-item" key={`${noti._id}-${index}`}>
                            <Link to={noti.url} className="dropdown-menu-link">
                                <div>
                                    {/* <i className="fas fa-gift" /> */}
                                    <Avatar src={noti.image} size="medium-avatar" />
                                </div>
                                <span>
                                    {noti.content}
                                    <br />
                                    <span>
                                        {moment(noti.createdAt).fromNow()}
                                    </span>
                                </span>
                            </Link>
                        </div>
                    ))

                }
                {/* <div className="dropdown-menu-item">
                    <Link to="#" className="dropdown-menu-link">
                        <div>
                            <i className="fas fa-gift" />
                        </div>
                        <span>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            <br />
                                <span>
                                    15/07/2020
                                </span>
                        </span>
                    </Link>
                </div> */}
            </div>
            <div className="dropdown-menu-footer">
                <Link to="/notifications">
                    <span>
                        View all notifications
                    </span></Link>
            </div>
        </div>
    )
}

export default NotifyModal;