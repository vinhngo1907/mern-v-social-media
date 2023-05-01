import React, { useState } from 'react';
import Avatar from '../other/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Icons from "../other/Icons";
import { CreateComment } from '../../redux/actions/commentAction';

const InputComment = ({ children, post, onReply, setOnReply }) => {
    const { auth, theme } = useSelector(state => state);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!content.trim()){
            if(setOnReply) return setOnReply(false);
            return
        }
        const newComment = {
            content,
            likes:[],
            user: auth.user,
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user,
            createdAt: new Date().toISOString()
        }

        dispatch(CreateComment({post,newComment, auth}));

        if(setOnReply) return setOnReply(false);
    }
    return (
        <div className='post-comment'>
            <div className='comet-avatar'>
                <Avatar src={auth.user.avatar} size="large-avatar" />
            </div>
            <div className='post-comt-box'>
                <form className="card-footer comment_input" onSubmit={handleSubmit} >
                    {children}
                    <input type="text" placeholder="Add your comments..."
                        value={content} onChange={e => setContent(e.target.value)}
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            background: theme ? 'rgba(0,0,0,.03)' : '',
                        }} />

                    <Icons setContent={setContent} content={content} theme={theme} />
                    <button type="submit" className="postBtn"></button>
                </form>
            </div>
        </div>
    )
}

export default InputComment;