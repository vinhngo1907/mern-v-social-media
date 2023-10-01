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
                <iframe id="videoPlaying"
                    frameBorder="0"
                    allowFullScreen="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    title="Nightcore - Just A Dream (Switching Vocals) - (Lyrics)"
                    width="640"
                    height="390"
                    src="https://www.youtube.com/embed/ywbKigZxuD8?autoplay=1&amp;controls=0&amp;mute=1&amp;start=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A8080&amp;widgetid=1"
                >

                </iframe>
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