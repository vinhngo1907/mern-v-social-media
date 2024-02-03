import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../components/global/LeftSideBar";
import VideoList from "../components/video/VideoList";
import VideoCurrent from "../components/video/VideoCurrent";
import LoadMoreBtn from "../components/other/LoadMoreBtn";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { deleteVideo } from "../redux/actions/videoAction";

const Videos = () => {
    const { videos, theme, auth, socket } = useSelector(state => state);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [load, setLoad] = useState(false);
    const [videoUrl, setVideoUrl] = useState("https://res.cloudinary.com/v-webdev/video/upload/v1694190767/v-media/v7yl2q5ywhwojdgimiil.mp4");

    const dispatch = useDispatch();
    
    const [videoSource, setVideoSource] = useState(videoUrl);

    // Create a ref for the audio element
    const videoRef = useRef(null);
    
    const handleDeleteVideo = () => {
        dispatch(deleteVideo({ id: "asd", auth, socket }));
    }

    const handleVolumeSliderChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume)
        if (videoRef.current) {
            videoRef.current.volume = newVolume / 100;
        }
    }

    const handleToggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    }

    const handleLoadMore = () => {
        try {
            setLoad(false);
            setLoad(true);
        } catch (error) {
            console.log(error);
            dispatch({ types: GLOBALTYPES.ALERT, payload: { error: error?.response?.data.message || error } });
        }
    }

    useEffect(() => {
        // When the video URL changes, update the video source
        if (videoRef.current) {
            videoRef.current.src = videoSource;
            videoRef.current.load();
        }
    }, [videoSource]);

    
    useEffect(() => {
        if (videos.player) {
            // window.playingVideo = player.playingVideo;
            // document.getElementById('titlePlayingVideo').innerHTML = `${data.playingVideo.title}`;
            // updateCount(data.playingVideo._id, data.playingVideo.likes, data.playingVideo.dislikes);
            // renderTracks(window.videoList, 'queueTracks');
            setVideoUrl(videos.player.videoUrl);
            setVideoSource(videos.player.videoUrl)
        }
    }, [videos.player]);

    useEffect(() => {
        // When the video URL changes, update the video source
        if (videoRef.current) {
          videoRef.current.src = videoUrl;
          videoRef.current.load();
        }
      }, [videoUrl]);

    return (
        <div className="home row mx-0">
            <div className="left_sidebar col-md-3">
                <LeftSideBar />
            </div>
            <div className="main_sidebar py-3 col-md-9">
                <div className="central-meta">
                    <div className="editing-interest">
                        <h5 className="f-title">Explore Videos</h5>
                    </div>
                    <main className={`${theme ? 'dark' : 'light'}`}>
                        <div id="videos-container" className="row">
                            <div className="col-md-7 current-video">
                                <VideoCurrent
                                    videoRef={videoRef}
                                    isMuted={isMuted}
                                    volume={volume}
                                    setIsMuted={setIsMuted}
                                    handleVolumeSliderChange={handleVolumeSliderChange}
                                    handleToggleMute={handleToggleMute}
                                    videoUrl={videoSource}
                                    // videoId={vid}
                                />
                            </div>
                            <div className="col-md-5 videos-container__tracks" id="queueTracks">
                                {
                                    videos.loading
                                        ? <div className='spinner-border d-block mx-auto text-dark' role='status'>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        : <VideoList
                                            videos={videos.data}
                                            eleId="senior-tracks"
                                            deleteVideo={handleDeleteVideo}
                                            theme={theme}
                                        />
                                }

                                {
                                    load && <div className="spinner-border d-block mx-auto text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                                {
                                    !videos.loading
                                    && <LoadMoreBtn load={load} page={videos.page} result={videos.result} handleLoadMore={handleLoadMore} />
                                }

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