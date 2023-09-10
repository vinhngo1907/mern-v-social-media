import React from 'react';
import TrackItem from './TrackItem'; // Import your TrackItem component

function TrackList({ videos, eleId, deleteVideo }) {
	return (
		<div id={eleId}>
			{videos && videos.map((res, index) => (
				<TrackItem
					key={res._id}
					res={res}
					counter={index + 1}
					eleId={eleId}
					deleteVideo={deleteVideo}
				/>
			))}
		</div>
	);
}

export default TrackList;
