import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import Avatar from './Avatar';
import { NOTIFY_TYPES, deleteAllNotifies, isReadNotify } from '../../redux/actions/notifyAction';
import NotiNotice from "../../assets/notice.png";

const NotifyModal = () => {
    const { auth, notify } = useSelector(state => state)
    const dispatch = useDispatch();
    const handleIsRead = (msg) => {
        dispatch(isReadNotify({ msg, auth }))
    }

    const handleSound = () => {
        dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
    }

    const handleDeleteAll = () => {
        const newArr = notify.data.filter(noti => noti.isRead === false);
        if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

        if (window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)) {
            return dispatch(deleteAllNotifies(auth.token))
        }
    }

    return (
        <div style={{ minWidth: '300px' }}>
            <div className="dropdown-menu-header px-3">
                <span>
                    {
                        notify.sound
                            ? <i className="fas fa-bell text-danger mr-2"
                                style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                                onClick={handleSound} />

                            : <i className="fas fa-bell-slash text-danger mr-2"
                                style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                                onClick={handleSound} />
                    }
                    Notifications

                </span>
            </div>
            <hr className="mt-0" />
            {
                notify.data.length === 0 &&
                <img src={NotiNotice} alt="noti" className='w-60 d-block mx-auto' />
            }

            <div className="dropdown-menu-content overlay-scrollbar scrollbar-hover" style={{ maxHeight: "300px" }}>
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
            <hr className="mt-0" />
            {
                notify.data.length > 0 && <div className="dropdown-menu-footer">
                    <div className='text-left text-primary ml-2'>

                        <Link to="/notifications">
                            <span>
                                View more
                            </span>
                        </Link>
                    </div>
                    <div className='text-right text-danger mr-2' onClick={handleDeleteAll}>
                        Delete all

                    </div>
                </div>
            }
        </div>
    )
}

export default NotifyModal;