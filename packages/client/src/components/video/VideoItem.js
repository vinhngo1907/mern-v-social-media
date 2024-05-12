import React from 'react';

function VideoItem({ res, counter, eleId, deleteVideo, theme }) {
	return (
		<div className="videos-container__track-item">
			<div className="row" style={{ margin: 0, paddingBottom: '1rem' }}>
				<div
					className="col-1 videos-container__track-no"
					style={{
						color: window.playingVideo?._id === res._id ? '#ffb347' : '',
					}}
				>
					{counter}
				</div>
				<div className="col-3 videos-container__track-image">
					<img
						src={res.thumbnailUrl}
						className="thumbnail" alt=""
						style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
					/>
					<div className="video-voting" id={`${eleId}-${res._id}`}>
						{/* Insert your updateCount logic here */}
						<div id="playing-video-voting" className='playing-vote'>
							<i className="fas fa-arrow-up q-m"
							// onclick="toggleLikeVideo('6469a87ad6ea489c49a5c2f2')"
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
				<div className="col-8 videos-container__track-info">
					<div className="videos-container__track-info__video-name">
						{res.title}
					</div>
					<div className="videos-container__track-info__suggested">
						Suggested by <strong className="suggested-author">{res.user.username}</strong>
					</div>
					{window.email === 'admin@v-dev.com' && (
						<button
							type="button"
							className="btn btn-danger btn-sm"
							onClick={() => deleteVideo(res._id)}
						>
							Delete
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default VideoItem;