import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Icons from './Icons';
import { imageShow, videoShow } from '../../utils/mediaShow';
import { createPost, editPost } from '../../redux/actions/postAction';

const StatusModal = () => {
    const { auth, theme, status, socket } = useSelector(state => state)
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [stream, setStream] = useState(false);
    const videoRef = useRef();
    const canvasRef = useRef();
    const [tracks, setTracks] = useState('');

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content)
            setImages(status.images)
        }
    }, [status]);

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

    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = (e) => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        canvasRef.current.setAttribute("width", width)
        canvasRef.current.setAttribute("height", height)

        const ctx = canvasRef.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = canvasRef.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        if (tracks) {
            tracks.stop()
        }
        setStream(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content || content === '' || images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: "Please add your media." }
            });

        if (status.onEdit) {
            dispatch(editPost({ content, images, auth, status, socket }));
        } else {
            dispatch(createPost({ content, images, auth, socket }));
        }

        setContent('')
        setImages([])
        if (tracks) tracks.stop()
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
                        {
                            stream &&
                            <div className="stream position-relative">
                                <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                                <span onClick={handleStopStream}>&times;</span>
                                <canvas ref={canvasRef} style={{ display: 'none' }} />
                            </div>
                        }
                        <div className="input_images">
                            {
                                stream
                                    ? <i className="fas fa-camera" onClick={handleCapture} style={{ fontSize: "18px" }} />
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