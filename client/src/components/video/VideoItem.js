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
						<div id="playing-video-voting" className='playing-vote'></div>
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