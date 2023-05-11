import React from "react";
import Avatar from "../components/other/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { removeNotify, NOTIFY_TYPES } from "../redux/actions/notifyAction";
import moment from "moment";

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
        <div className="notifications">
            <div className="col-md-6">
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
                        <div className="notification-box">
                            <ul>
                                {
                                    notify.loading ? <div className="d-block mx-auto spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                        :
                                        notify.data.map((noti, index) => (
                                            <li key={`${noti._id}-${index}`}>
                                                <figure>
                                                    <Avatar
                                                        src="https://res.cloudinary.com/v-webdev/image/upload/v1679677989/test/ispwvdjdqgkami7ndqha.jpg"
                                                        size="big-avatar"
                                                    />
                                                </figure>
                                                <div className="notifi-meta">
                                                    <p>bob frank like your post</p>
                                                    <span>{moment(noti.createdAt).fromNow()}</span>
                                                </div>
                                                <i className="del fa fa-close" onClick={() => handleDelete(noti)} />
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