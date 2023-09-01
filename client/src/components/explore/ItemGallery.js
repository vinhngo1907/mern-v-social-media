import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (result === 0) return <h2 className="text-center text-danger">No Post</h2>

    return (
        <div className='post_thumb'>
            {images.map((image, index) => (
                <Link className="strip" to="#" title="">
                    <div className="post_thumb_display">
                        {/* <img src="https://res.cloudinary.com/v-webdev/image/upload/v1683457124/v-media/profileImg_cven4n.jpg" alt="" /> */}
                        <img
                            src={image.url}
                            alt={`alt-${index}`}
                            className="img-fluid"
                            onClick={() => handleImageClick(index)}
                        />
                    </div>
                </Link>
                // <div className="col-md-4 mb-4" key={index}>
                //     <img
                //         src={image.url}
                //         alt={`alt-${index}`}
                //         className="img-fluid"
                //         onClick={() => handleImageClick(index)}
                //     />
                // </div>
            ))
            }

            {showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Image Gallery</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={images[currentImageIndex].url}
                                    alt={`Alt ${currentImageIndex}`}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="modal-footer">
                                <span className="mr-auto">
                                    {currentImageIndex + 1} of {images.length}
                                </span>
                                <button className="btn btn-link" onClick={handlePrevImage}>
                                    &lt;
                                </button>
                                <button className="btn btn-link" onClick={handleNextImage}>
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemGallery;
