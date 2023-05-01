import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentMenu = ({post, comment, setOnEdit}) =>{
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const handleRemove = (e)=>{
        
    }
    const MenuItem = () => {
        return(
            <>
                <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                    <span className="material-icons">create</span> Edit
                </div>
                <div className="dropdown-item" onClick={handleRemove}>
                    <span className="material-icons">delete_outline</span> Remove
                </div>
            </>
        )
    }
    return (
        <div className='menu'></div>
    )
}

export default CommentMenu;