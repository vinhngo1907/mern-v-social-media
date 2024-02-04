import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../components/global/LeftSideBar";
import VideoList from "../components/video/VideoList";
import VideoCurrent from "../components/video/VideoCurrent";
import LoadMoreBtn from "../components/other/LoadMoreBtn";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { VIDEOS_TYPES, deleteVideo } from "../redux/actions/videoAction";
import { getDataApi } from "../utils/fetchData";

const Videos = () => {
    const { videos, theme, auth, socket } = useSelector(state => state);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [load, setLoad] = useState(false);
    const [videoSource, setVideoSource] = useState("");
    const [videoId, setVideoId] = useState(null)
    const dispatch = useDispatch();

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

    const handleLoadMore = async () => {
        try {
            setLoad(true);
            const res = await getDataApi(`video`, auth.token);
            dispatch({ type: VIDEOS_TYPES.UPDATE_TRACKS, payload: res.data.results.videos })
            setLoad(false);
        } catch (error) {
            console.log(error);
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error?.response?.data.message || error } });
        }
    }

    useEffect(() => {
        if (videos.player) {
            setVideoSource(videos.player.videoUrl);
            setVideoId(videos.player._id);
        }
    }, [videos.player]);

    useEffect(() => {
        // When the video URL changes, update the video source
        if (videoRef.current) {
            videoRef.current.src = videoSource;
            videoRef.current.load();
        }
    }, [videoSource]);

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
                            <div className="col-md-7 current-video my-auto px-0">
                                {
                                    videos.player ? (<VideoCurrent
                                        videoRef={videoRef}
                                        isMuted={isMuted}
                                        volume={volume}
                                        setIsMuted={setIsMuted}
                                        handleVolumeSliderChange={handleVolumeSliderChange}
                                        handleToggleMute={handleToggleMute}
                                        videoUrl={videoSource}
                                        videoId={videoId}
                                    />) :
                                        <div className='spinner-border d-block mx-auto text-dark' role='status'>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                }
                            </div>
                            <div className="col-md-5 videos-container__tracks" id="queueTracks">
                                {videos.loading && (
                                    <div className='spinner-border d-block mx-auto text-dark' role='status'>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}

                                {!videos.loading && (
                                    <>
                                        <VideoList
                                            videos={videos.data.tracks}
                                            eleId="senior-tracks"
                                            deleteVideo={handleDeleteVideo}
                                            theme={theme}
                                        />

                                        {load && (
                                            <div className="spinner-border d-block mx-auto text-primary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        )}

                                        {!load && (
                                            <LoadMoreBtn
                                                load={load}
                                                page={videos.page}
                                                result={videos.result}
                                                handleLoadMore={handleLoadMore}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Videos;