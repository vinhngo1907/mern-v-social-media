import React from "react";
import Carousel from "../../other/Carousel";

const CardBody = ({ post, theme }) => {
    return (
        <div className="card_body">
            <div className="card_body-content"
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}>
                {/* <span>
                    {
                        post.content.length < 60 
                        ? post.content 
                        : readMore ? post.content + ' ' : post.content.slice(0, 60) + '.....'
                    }
                </span> */}
                {
                    post.content
                }
            </div>
            {
                post.images.length > 0 && <Carousel images={post.images} id={post._id} />
            }
        </div>
    )
}
export default CardBody