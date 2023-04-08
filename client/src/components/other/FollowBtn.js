import React, { useState } from 'react';

const FollowBtn = ({user}) => {
    const [followed, setFollowed] = useState(false);
    const handleFollow = () => {

    }
    const handleUnFollow = () => {

    }
    return(
        <>
            {
                followed
                    ? <button className="btn btn-outline-danger"
                        onClick={handleUnFollow}>
                        UnFollow
                    </button>
                    : <button className="btn btn-outline-info"
                        onClick={handleFollow}>
                        Follow
                    </button>
            }
        </>
    )
}

export default FollowBtn;