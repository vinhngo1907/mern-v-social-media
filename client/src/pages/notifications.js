import React from "react";
import Avatar from "../components/other/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { removeNotify, NOTIFY_TYPES } from "../redux/actions/notifyAction";
import moment from "moment";
import LeftSideBar from "../components/home/LeftSideBar";

const Notifications = () => {
    const { auth, notify } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleDelete = (noti) => {
        if (window.confirm("Are you sure?")) {
            dispatch(removeNotify({ msg: noti, auth }))
        }
    }

    const handleSound = () => {
        dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound })
    }

    return (
        <div className="notifications row mx-0 ">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-6">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title">
                            {
                                notify.sound
                                    ? <i className="fas fa-bell text-danger mr-2"
                                        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                                        onClick={handleSound} />

                                    : <i className="fas fa-bell-slash text-danger mr-2"
                                        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                                        onClick={handleSound} />
                            }
                            All Notifications
                        </h5>
                        <hr />
                        <div className="notification-box">
                            <ul>
                                {
                                    notify.loading ? <div className="d-block mx-auto spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                        :
                                        notify.data.map((noti, index) => (
                                            <li key={`${noti._id}-${index}`}>
                                                <div className="d-flex position-relative align-items-center justify-content-between">

                                                    <div className='d-flex' style={{ flexDirection: "column" }}>
                                                        <div className="d-flex">
                                                            <figure>
                                                                <Avatar
                                                                    src={noti.user.avatar}
                                                                    size="big-avatar"
                                                                />
                                                            </figure>
                                                            <strong className="mr-1">{noti.user.username}</strong>
                                                        </div>
                                                        <span>{noti.text}</span>
                                                    </div>


                                                    <div className="notifi-meta">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <p>
                                                                {noti.content && noti.content.length >= 45
                                                                    ? `${noti.content.slice(0, 46)}...`
                                                                    : noti.content
                                                                }
                                                            </p>
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
                                                        </div>
                                                        <span>{moment(noti.createdAt).fromNow()}</span>
                                                    </div>
                                                    <i className="del fa fa-close" onClick={() => handleDelete(noti)} />
                                                </div>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications