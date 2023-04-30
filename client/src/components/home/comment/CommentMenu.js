import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentMenu = ({post, comment, setOnEdit}) =>{
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    
    return (
        <div className='menu'></div>
    )
}

export default CommentMenu;