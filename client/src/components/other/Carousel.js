import React from 'react';
import { useSelector } from 'react-redux';

const Carousel = ({ images, id }) => {
    const { theme } = useSelector(state => state);
    const isActive = (index) => {
        if (index === 0) return "active";
    }
    return (
        <div id={`image${id}`} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators" style={{ zIndex: 1 }}>
                {
                    images.map((img, index) => (
                        <li key={index} data-target={`#image${id}`}
                            data-slide-to={index} className={isActive(index)} />
                    ))
                }
            </ol>
            <div class="carousel-inner">
                {
                    images.map((img, index) => (
                        <div key={index} className={`carousel-item ${isActive(index)}`}>
                            {
                                img.url.match(/video/i)
                                    ? <video controls src={img.url} className="d-block w-100" alt={img.url}
                                        style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                                    : <img src={img.url} className="d-block w-100" alt={img.url}
                                        style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                            }

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Carousel;