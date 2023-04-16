import React from "react";

const CardBody = ({ post, theme }) => {

    return (
        <div className="card_body">
            <div className="card_body-content"
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}>

            </div>
        </div>
    )
}
export default CardBody