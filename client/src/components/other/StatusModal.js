import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Icons from './Icons';
import { imageShow, videoShow } from '../../utils/mediaShow';
import { createPost } from '../../redux/actions/postAction';

const StatusModal = () => {
    const { auth, theme, status } = useSelector(state => state)
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content)
            setImages(status.images)
        }
    }, [status]);
    const [stream, setStream] = useState(false);
    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = [];
        files.forEach(file => {
            if (!file) err = "Please select a file";

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file);
        });

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setImages([...images, ...newImages]);
    }
    const deleteImages = (index) => {
        let newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr)
    }
    const handleStream = (e) => {

    }
    const handleCapture = (e) => {

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (images.length === 0)
        //     return dispatch({
        //         type: GLOBALTYPES.ALERT, payload: { error: "Please add your media." }
        //     });

        if (status.onEdit) {

        } else {
            dispatch(createPost({ content, images, auth }))
        }

        setContent('');
        setImages([]);
        dispatch({ type: GLOBALTYPES.STATUS, payload: false })
    }
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
                        {/* stream */}
                        <div className="input_images">
                            {
                                stream
                                    ? <i className="fas fa-video" onClick={handleCapture} style={{ fontSize: "18px" }} />
                                    : <>
                                        <div className='file_upload'>
                                            <i className="fas fa-camera" onClick={handleStream} style={{ fontSize: "18px" }} />
                                        </div>
                                        <div className="file_upload">
                                            <i className="fas fa-image" style={{ fontSize: "18px" }} />
                                            <input type="file" name="file" id="file"
                                                multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                        </div>
                                    </>
                            }
                        </div>
                        <Icons setContent={setContent} content={content} theme={theme} />
                    </div>
                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
                                    {
                                        img.camera ? imageShow(img.camera, theme)
                                            : img.url
                                                ? <>
                                                    {
                                                        img.url.match(/video/i)
                                                            ? videoShow(img.url, theme)
                                                            : imageShow(img.url, theme)
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        img.type.match(/video/i)
                                                            ? videoShow(URL.createObjectURL(img), theme)
                                                            : imageShow(URL.createObjectURL(img), theme)
                                                    }
                                                </>
                                    }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
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