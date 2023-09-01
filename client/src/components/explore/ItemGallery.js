import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ItemGallery = ({ items, result }) => {
    const { theme } = useSelector(state => state);
    const [showModal, setShowModal] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const handleItemClick = (index) => {
        setCurrentItemIndex(index);
        setShowModal(true);
    };

    const handleNextItem = () => {
        if (currentItemIndex < items.length - 1) {
            setCurrentItemIndex(currentItemIndex + 1);
        }
    };

    const handlePrevItem = () => {
        if (currentItemIndex > 0) {
            setCurrentItemIndex(currentItemIndex - 1);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (result === 0) return <h2 className="text-center text-danger">No Items</h2>

    return (
        <div className='post_thumb'>
            {items.map((item, index) => (
                <Link className="strip" to="#" title="">
                    <div className="post_thumb_display">
                        {
                            item.url.match(/video/i)
                                ? <video controls src={item.url} alt={item.url} onClick={() => handleItemClick(index)}
                                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                                : <img src={item.url} alt={item.url} onClick={() => handleItemClick(index)}
                                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                        }
                    </div>
                </Link>
            ))
            }

            {showModal && (
                <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Item Gallery</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={items[currentItemIndex].url}
                                    alt={`Alt ${currentItemIndex}`}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="modal-footer">
                                <span className="mr-auto">
                                    {currentItemIndex + 1} of {items.length}
                                </span>
                                <button className="btn btn-link" onClick={handlePrevItem}>
                                    &lt;
                                </button>
                                <button className="btn btn-link" onClick={handleNextItem}>
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
