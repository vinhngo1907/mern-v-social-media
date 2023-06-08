import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icons from "../other/Icons";
import UserCard from "../other/UserCard";
import { Link, useParams } from "react-router-dom";

const RightSide = () => {
    const { auth, message, theme, socket, peer } = useSelector(state => state)
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [user, setUser] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const {id} = useParams();
    
    useEffect(() => {
        const newUser = message.users.find(user => user._id === id);
        if(newUser) setUser(newUser);
    }, [id, message.users])

    const handleSubmit = () => {

    }

    const handleAudioCall = () => {

    }

    const handleDeleteCV = () =>{

    }

    const handleVideoCall = () => {

    }

    return (
        <>
            <div className="message_header p-3" style={{ cursor: 'pointer' }}>
                <div className="message_back"><Link to="/"><i className="fas fa-arrow-left text-dark" /></Link></div>
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
            <div className="chat_container"></div>
            <form className="chat_input" onSubmit={handleSubmit} >
                <input type="text" placeholder="Enter you message..."
                    value={text} onChange={e => setText(e.target.value)}
                    style={{
                        filter: theme ? 'invert(1)' : 'invert(0)',
                        background: theme ? '#040404' : '',
                        color: theme ? 'white' : ''
                    }} />

                <Icons setContent={setText} content={text} theme={theme} />
            </form>
        </>
    )

}

export default RightSide;