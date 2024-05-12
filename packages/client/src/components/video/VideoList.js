import React from 'react';
import VideoItem from './VideoItem'; // Import your TrackItem component

function VideoList({ videos, eleId, deleteVideo, theme }) {
	return (
		<div id={eleId}>
			{videos && videos.map((res, index) => (
				<VideoItem
					key={res._id}
					res={res}
					counter={index + 1}
					eleId={eleId}
					deleteVideo={deleteVideo}
					theme={theme}
				/>
			))}
		</div>
	);
}

export default VideoList;
