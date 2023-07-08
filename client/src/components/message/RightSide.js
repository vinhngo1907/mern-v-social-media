import React, { useState, useEffect, useRef } from 'react';
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Icons from "../other/Icons";
import UserCard from "../other/UserCard";
import Avatar from "../other/Avatar";
import MsgDisplay from "./MsgDisplay";
import { createMessage, deleteConversation, getMessages, loadMoreMessages } from '../../redux/actions/messageAction';
import { imageShow, videoShow } from '../../utils/mediaShow'
import { checkImage, imageUpload } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const RightSide = () => {
    const { auth, message, theme, socket } = useSelector(state => state)
    const dispatch = useDispatch();
    const history = useHistory();
    const [text, setText] = useState('');
    const [media, setMedia] = useState([]);
    const [loadMedia, setLoadMedia] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(0);

    const [user, setUser] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [result, setResult] = useState(9);
    const [showSidebar, setShowSidebar] = useState(false);
    const { id } = useParams();

    const refDisplay = useRef();
    // const pageEnd = useRef();

    useEffect(() => {
        const newUser = message.users.find(user => user._id === id);
        if (newUser) setUser(newUser);
    }, [id, message.users]);

    useEffect(() => {
        const newData = message.data.find(item => item._id === id);
        if (newData) {
            setData(newData.messages);
            setResult(newData.result);
            setPage(newData.page);
        }

    }, [id, message.data]);

    useEffect(() => {
        const getMessagesData = async () => {
            if (message.data.every(item => item._id !== id)) {
                await dispatch(getMessages({ id, auth }))
                setTimeout(() => {
                    refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }, 50)
            }
        }
        getMessagesData()
    }, [id, dispatch, auth, message.data]);

    useEffect(() => {
        if (isLoadMore > 1) {
            if (result >= page * 9) {
                dispatch(loadMoreMessages({ auth, id, page: page + 1 }))
                setIsLoadMore(1)
            }
        }
    }, [isLoadMore, result, page, dispatch, id, auth]);

    // Load More
    // useEffect(() => {
    //     const observer = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting) {
    //             setIsLoadMore(p => p + 1)
    //         }
    //     }, {
    //         threshold: 0.1
    //     })

    //     observer.observe(pageEnd.current)
    // }, [setIsLoadMore]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && media.length === 0) return;

        setText('');
        setMedia([]);
        setLoadMedia(true);

        let newArr = [];
        if (media.length > 0) newArr = await imageUpload(media, auth.token);
        const msg = {
            text,
            sender: auth.user._id,
            recipient: id,
            media: newArr,
            createdAt: new Date().toISOString()
        }

        setLoadMedia(false);
        await dispatch(createMessage({ auth, msg, socket }));
    }

    const handleAudioCall = () => {

    }

    const handleDeleteCV = () => {
        if (window.confirm("Are you sure about that?")) {
            dispatch(deleteConversation({ auth, id }));
            return history.push("/message");
        }
    }

    const handleVideoCall = () => {

    }

    const handleChangeMedia = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newMedia = [];

        files.forEach(file => {
            err = checkImage(file);
            if (err !== "") return err;

            return newMedia.push(file)
        });

        if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setMedia([...media, ...newMedia]);
    }

    const handleDeleteMedia = (index) => {
        let newArr = [...media];
        newArr.splice(index, 1);
        setMedia(newArr);
    }

    return (
        <>
            <div className="message_header p-3" style={{ cursor: 'pointer' }}>
                <div className="message_back"><Link to="/message"><i className="fas fa-arrow-left text-dark" /></Link></div>
                {
                    user.length !== 0 &&
                    <UserCard user={user}>
                        <div className="message_tool">
                            <i className="fas fa-phone-alt text-primary mr-3" onClick={handleAudioCall} />

                            <i className="fas fa-video text-success mr-3" onClick={handleVideoCall} />

                            <i className="fas fa-trash text-danger mr-3"
                                onClick={handleDeleteCV}
                            />

                            <i className="fas fa-info-circle text-info"
                                onClick={() => setShowSidebar(!showSidebar)}
                            />
                        </div>
                    </UserCard>
                }
            </div>
            <div className="chat_container" style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }} >
                <div className='chat_display' ref={refDisplay}>
                    {
                        data.map((item, index) => (
                            <div key={index}>
                                {
                                    item.recipient === auth.user._id &&
                                    <div className="chat_row other_message">
                                        <MsgDisplay user={user} theme={theme} msg={item} />
                                    </div>
                                }
                                {
                                    item.sender === auth.user._id &&
                                    <div className="chat_row you_message">
                                        <MsgDisplay user={auth.user} theme={theme} msg={item} data={data} />
                                    </div>
                                }
                            </div>
                        ))
                    }
                    {
                        loadMedia &&
                        <div className="spinner-border d-block mx-auto" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                </div>
                <div className={`message_sidebar ${theme ? 'dark' : 'light'} ${showSidebar ? 'show' : ''}`}>
                    {
                        user.length !== 0 &&
                        <div className="chat_user_info text-center py-5">
                            <div className="chat_user_img">
                                <Avatar src={user.avatar} size="super-avatar" />
                            </div>
                            <div className="chat_user_content">
                                <Link to="#" className="chat_user_link">
                                    <div><i className="fas fa-calendar" /> </div>
                                    <span>{moment(user.createdAt).fromNow()}</span>
                                </Link>
                                <Link to="#" className="chat_user_link">
                                    <div><i className="fas fa-venus-mars" /></div>
                                    <span>{user.birthday ? user.gender : 'Other'}</span>
                                </Link>
                                <Link to="#" className="chat_user_link">
                                    <div><i className="fas fa-mobile" /></div>
                                    <span>{`(+84) ${user.mobile}`}</span>
                                </Link>
                                <Link to="#" className="chat_user_link">
                                    <div><i className="fas fa-envelope" /></div>
                                    <span>{user.email}</span>
                                </Link>
                                <Link to="#" className="chat_user_link">
                                    <div><i className="fas fa-map-marker" /></div>
                                    <span>{user.address ? user.address : 'No address'}</span>
                                </Link>
                            </div>
                        </div>
                    }

                </div>
            </div>
            <div className="show_media" style={{ display: media.length > 0 ? 'grid' : 'none' }}>
                {
                    media.map((item, index) => (
                        <div key={index} id="file_media">
                            {
                                item.type.match(/video/i)
                                    ? videoShow(URL.createObjectURL(item), theme)
                                    : imageShow(URL.createObjectURL(item), theme)
                            }
                            <span onClick={() => handleDeleteMedia(index)} >&times;</span>
                        </div>
                    ))
                }
            </div>
            <form className="chat_input" onSubmit={handleSubmit} >
                <input type="text" placeholder="Enter you message..."
                    value={text} onChange={e => setText(e.target.value)}
                    style={{
                        filter: theme ? 'invert(1)' : 'invert(0)',
                        background: theme ? '#040404' : '',
                        color: theme ? 'white' : ''
                    }} />

                <Icons setContent={setText} content={text} theme={theme} />
                <div className="file_upload">
                    <i className="fas fa-image text-danger" />
                    <input type="file" name="file" id="file"
                        multiple accept="image/*,video/*" onChange={handleChangeMedia} />
                </div>

                <button type="submit" className="material-icons"
                    disabled={(text || media.length > 0) ? false : true}>
                    near_me
                </button>
            </form>
        </>
    )

}

export default RightSide;