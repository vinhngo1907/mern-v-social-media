import React, { useState } from 'react';

const ItemGallery = ({ images, result }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setShowModal(true);
    };
    
    const handleNextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };
    
    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if (result === 0) return <h2 className="text-center text-danger">No Post</h2>
    
    return (
        <div>
            <div className="row">
                {images.map((image, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <img
                            src={image.url}
                            alt={`alt-${index}`}
                            className="img-fluid"
                            onClick={() => handleImageClick(index)}
                        />
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <img
                                    src={images[currentImageIndex].url}
                                    alt={`Alt ${currentImageIndex}`}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="modal-footer">
                                {currentImageIndex > 0 && (
                                    <button className="btn btn-secondary" onClick={handlePrevImage}>
                                        Previous
                                    </button>
                                )}
                                {currentImageIndex < images.length - 1 && (
                                    <button className="btn btn-primary" onClick={handleNextImage}>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemGallery;
