import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icons from "../other/Icons";

const RightSide = () => {
    const { auth, message, theme, socket, peer } = useSelector(state => state)
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleSubmit = () =>{

    }

    return (
        <>
            <div className="message_header" style={{cursor: 'pointer'}} ></div>
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