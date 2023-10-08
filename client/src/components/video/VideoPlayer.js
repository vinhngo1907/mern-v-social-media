import React from 'react';

const VideoPlayer = ({ videoUrl, isMuted, volume, theme, videoRef }) => {
    // const [videoSource, setVideoSource] = useState(videoUrl);
    // const videoRef = useRef(null);

    // useEffect(() => {
    //     // When the video URL changes, update the video source
    //     if (videoRef.current) {
    //         videoRef.current.src = videoSource;
    //         videoRef.current.load();
    //     }
    // }, [videoSource]);

    return (
        <video
            id="videoPlaying"
            ref={videoRef}
            width="100%"
            height="345"
            muted={isMuted}
            volume={volume}
            controls
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
        >
            <source src={videoUrl} alt="" />
        </video>
    );
};

export default VideoPlayer;