import React from "react";

const VideoCurrent = ({ isMuted, volume, setIsMuted, handleVolumeSliderChange }) => {
    return (
        <div id="main-video">
            <div id="video">
                <p className="videos-container__header" style={{
                    "marginLeft": "0.6667em", width: "100%"
                }}>
                    Currently playing
                </p>
                <div id="video-react" style={{ width: "100%" }}>
                    <button id="muted" onClick={() => setIsMuted(!isMuted)} title="Mute">
                        <i className={`fas fa-volume-${isMuted ? 'mute' : 'up'}`} />
                    </button>
                    <input id="volume-control" type="range" min="0" max="100"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeSliderChange}
                    />
                </div>
                <div id="videoPlaying"></div>
                <div id="video-content">
                    <div id="titlePlayingVideo"></div>
                </div>
                <div className="video-voting">
                    <div id="playing-video-voting" className=" playing-vote"></div>
                </div>
            </div>
        </div>
    )
}

export default VideoCurrent;