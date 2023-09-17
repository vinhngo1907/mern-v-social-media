import React from "react";
import { useSelector } from "react-redux";
import LeftSideBar from "../components/global/LeftSideBar";
import VideoList from "../components/video/VideoList";

const Videos = () => {
    const { videos } = useSelector(state => state);

    const changeMute = () => {

    }

    const deleteVideo = () => {

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
                                            <button id="muted" onChange={changeMute}>
                                                <i className="fas fa-volume-mute"></i>
                                            </button>
                                            <input id="volume-control" type="range" min="0" max="100" value="0" />
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
                    {/* {
                        videos.loading ? <div className='d-block mx-auto text-dark spinner-border' role='status'>
                            <span className="sr-only">Loading...</span>
                        </div>
                            :
                            <ItemGallery items={videos.data} result={videos.result} />
                    } */}
                    {/* {
                        load && <div className="spinner-border d-block mx-auto text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    } */}
                    {/* {
                        !videos.loading
                        && <LoadMoreBtn load={load} page={videos.page} result={videos.result} handleLoadMore={handleLoadMore} />
                    } */}
                </div>
            </div>
        </div>
    )
}

export default Videos;