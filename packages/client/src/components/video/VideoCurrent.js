import React from "react";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";

const VideoCurrent = (props) => {
    const {
        videoRef,
        isMuted, volume, setIsMuted, handleVolumeSliderChange, videoUrl,
        title
    } = props;
    const { theme } = useSelector(state => state);

    return (
        <div id="main-video">
            <div id="video">
                <p
                    className="videos-container__header"
                    style={{
                        marginLeft: "1rem", width: "100%"
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

                <VideoPlayer
                    videoUrl={videoUrl}
                    isMuted={isMuted}
                    volume={volume}
                    theme={theme}
                    videoRef={videoRef}
                />
                <div id="video-content">
                    <div id="titlePlayingVideo">{title}</div>
                </div>
                <div className="video-voting">
                    <div id="playing-video-voting" className="playing-vote">
                        <i className="fas fa-arrow-up q-m"
                        // onclick={() => toggleLikeVideo({id: })}
                        />
                        <h5 className="vote-counter"
                            style={{
                                paddingRight: "0.4333em", paddingTop: "10px", fontWeight: 300, fontSize: "1.1333rem"
                            }}>4
                        </h5>
                        <i className="fas fa-arrow-down q-m"
                        // onclick="toggleDislikeVideo('6469a87ad6ea489c49a5c2f2')"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCurrent;