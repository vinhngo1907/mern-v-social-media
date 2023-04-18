import React from 'react';

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
    return (
        <>
            {
                result < 9 * (page - 1) ? '' :
                    !load &&
                    <button class="btn-view btn-load-more" onClick={handleLoadMore}>Load More</button>
            }
        </>
    )
}

export default LoadMoreBtn;