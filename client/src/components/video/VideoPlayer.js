import React from 'react';

const VideoPlayer = ({ videoUrl, isMuted, volume, theme, videoRef }) => {
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