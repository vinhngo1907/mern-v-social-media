import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import Avatar from './Avatar';
import { isReadNotify } from '../../redux/actions/notifyAction';
import NotiNotice from "../../assets/notice.png";

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch();
    const handleIsRead = (msg) => {
        dispatch(isReadNotify({ msg, auth }))
    }

    return (
        <div style={{ minWidth: '300px' }}>
            <div className="dropdown-menu-header px-3">
                <span>
                    Notifications
                </span>
            </div>
            <hr className="mt-0" />
            {
                notify.data.length === 0 &&
                <img src={NotiNotice} alt="noti" className='w-60 d-block mx-auto' />
            }

            <div className="dropdown-menu-content overlay-scrollbar scrollbar-hover">
                {
                    notify.data.map((noti, index) => (
                        <div className="dropdown-menu-item position-relative" key={`${noti._id}-${index}`}>
                            <Link to={noti.url} className="dropdown-menu-link" onClick={() => handleIsRead(noti)}>
                                <div>
                                    <Avatar src={noti.user.avatar} size="large-avatar" />
                                </div>

                                <span>
                                    <div className='d-flex' style={{ flexDirection: "column" }}>
                                        <strong className="mr-1">{noti.user.username}</strong>
                                        <span>{noti.text}</span>
                                    </div>
                                    {noti.content && noti.content.length >= 45
                                        ? `${noti.content.slice(0, 46)}...`
                                        : noti.content
                                    }
                                    <br />
                                    <span>
                                        {moment(noti.createdAt).fromNow()}
                                    </span>
                                </span>
                                {
                                    noti.image &&
                                    <div style={{ width: '30px' }}>
                                        {
                                            noti.image.match(/video/i)
                                                ? <video src={noti.image} width="100%" />
                                                : <Avatar src={noti.image} size="medium-avatar" />
                                        }
                                    </div>
                                }
                            </Link>
                            {
                                !noti.isRead ? <span className="tag red">Unseen</span> : <span className="tag green">Seen</span>
                            }
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
            {
                notify.data.length > 0 && <div className="dropdown-menu-footer">
                    <Link to="/notifications">
                        <span>
                            View all notifications
                        </span></Link>
                </div>
            }
        </div>
    )
}

export default NotifyModal;