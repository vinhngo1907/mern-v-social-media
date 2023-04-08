import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Icons from './Icons';

const StatusModal = () => {
    const { auth, theme, status } = useSelector(state => state)
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content)
            setImages(status.images)
        }
    }, [status]);

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <span onClick={() => dispatch({
                        type: GLOBALTYPES.STATUS, payload: false
                    })}>
                        &times;
                    </span>
                </div>
                <div className='status_body'>
                    <textarea name="content" value={content}
                        placeholder={`${auth.user.username}, what are you thinking?`}
                        onChange={(e) => setContent(e.target.value)}
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            background: theme ? 'rgba(0,0,0,.03)' : '',
                        }}>

                    </textarea>
                    <div className='d-flex'>
                        <div className='flex-fill'></div>
                        <Icons setContent={setContent} content={content} theme={theme}/>
                    </div>
                </div>
                <div className="status_footer">
                    <button className="btn btn-secondary w-100" type="submit">
                        Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal;