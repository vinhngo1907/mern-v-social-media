import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import LeftSideBar from "../components/global/LeftSideBar";
import VideoList from "../components/video/VideoList";

const Videos = () => {
    const { videos } = useSelector(state => state);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    // Create a ref for the audio element
    const audioRef = useRef(null);
    const deleteVideo = () => {

    }
    const handleVolumeSliderChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    }

    return (
        <div className="home row mx-0 ">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-9">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title">Explore Videos</h5>
                    </div>
                    <main>
                        <div id="videos-container" className="row">
                            <div className="col-md-7 current-video">
                                <div id="main-video">
                                    <div id="video">
                                        <p className="videos-container__header" style={{ "marginLeft": "0.6667em", width: "100%" }}>
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
                            </div>
                            <div className="col-md-5 videos-container__tracks" id="queueTracks">
                                <VideoList videos={videos.data} eleId="senior-tracks" deleteVideo={deleteVideo} />
                                {/* <div className="videos-container__track-item">
                                    <div className="row" style={{ margin: 0, paddingBottom: "1rem" }}>
                                        <div className="col-1 videos-container__track-no" >1</div>
                                        <div className="col-3 videos-container__track-image">
                                            <img src="https://i.ytimg.com/vi/ywbKigZxuD8/default.jpg" className="thumbnail" alt=""
                                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                                            />
                                            <div className="video-voting" id="queueTracks-6456514bc2b036a247ac62dd">

                                                <i className="fas fa-arrow-up q-m"
                                                // onclick="toggleLikeVideo('6456514bc2b036a247ac62dd')"
                                                ></i>
                                                <h5 className="vote-counter" style={{
                                                    paddingRight: "0.4333em", paddingTop: "10px", fontWeight: 300, fontSize: "1.1333rem"
                                                }}>2</h5>
                                                <i className="fas fa-arrow-down q-m"
                                                // onclick="toggleDislikeVideo('6456514bc2b036a247ac62dd')"
                                                ></i>

                                            </div>
                                        </div>
                                        <div className="col-8 videos-container__track-info">
                                            <div className="videos-container__track-info__video-name">
                                                🎶 Nightcore ▶ 😿 UNDERWATER 😿 (Lyrics) | Nikki Flores
                                            </div>
                                            <div className="videos-container__track-info__suggested">
                                                Suggested by <strong classname="sugested-author">vinhtrungngo1907</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="videos-container__track-item">
                                    <div className="row" style={{ margin: 0, paddingBottom: "1rem", with: "100%" }}>
                                        <div className="col-1 videos-container__track-no">2</div>
                                        <div className="col-3 videos-container__track-image">
                                            <img src="https://i.ytimg.com/vi/io2WOQ-3aVs/default.jpg" className="thumbnail" alt=""
                                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                                            />
                                            <div className="video-voting" id="queueTracks-64842187edaec0a3ce68e4e5">

                                                <i className="fas fa-arrow-up q-m"
                                                // onclick="toggleLikeVideo('64842187edaec0a3ce68e4e5')"
                                                ></i>
                                                <h5 className="vote-counter"
                                                    style={{ paddingRight: "0.4333em", paddingTop: "10px", fontWeight: 300, fontSize: "1.1333rem" }}
                                                >0
                                                </h5>
                                                <i className="fas fa-arrow-down q-m"
                                                // onclick="toggleDislikeVideo('64842187edaec0a3ce68e4e5')"
                                                ></i>

                                            </div>
                                        </div>
                                        <div className="col-8 videos-container__track-info">
                                            <div className="videos-container__track-info__video-name">
                                                Wake (Hillsong Young and Free) lyric video
                                            </div>
                                            <div className="videos-container__track-info__suggested">
                                                Suggested by <strong classname="sugested-author">vinhtrungngo1907</strong>
                                            </div></div>
                                    </div>

                                </div>
                                <div className="videos-container__track-item">
                                    <div className="row" style={{ margin: 0, paddingBottom: "1rem" }}>
                                        <div className="col-1 videos-container__track-no">2</div>
                                        <div className="col-3 videos-container__track-image">
                                            <img src="https://i.ytimg.com/vi/sRITtsPax9U/default.jpg" className="thumbnail" alt=""
                                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                                            <div className="video-voting" id="queueTracks-6469a7610099389a17f2e510">

                                                <i className="fas fa-arrow-up q-m"
                                                // onclick="toggleLikeVideo('64842187edaec0a3ce68e4e5')"
                                                ></i>
                                                <h5 className="vote-counter"
                                                    style={{ paddingRight: "0.4333em", paddingTop: "10px", fontWeight: 300, fontSize: "1.1333rem" }}
                                                >0
                                                </h5>
                                                <i className="fas fa-arrow-down q-m"
                                                // onclick="toggleDislikeVideo('64842187edaec0a3ce68e4e5')"
                                                ></i>

                                            </div>
                                        </div>
                                        <div className="col-8 videos-container__track-info">
                                            <div className="videos-container__track-info__video-name">
                                                Wake (Hillsong Young and Free) lyric video
                                            </div>
                                            <div className="videos-container__track-info__suggested">
                                                Suggested by <strong classname="sugested-author">vinhtrungngo1907</strong>
                                            </div></div>
                                    </div>

                                </div> */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Videos;