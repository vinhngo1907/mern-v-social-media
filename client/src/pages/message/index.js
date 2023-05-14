import React from 'react'
import LeftSide from '../../components/message/LeftSide'

const Message = () => {
    return (
        <div className="container message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide />
            </div>

            <div className="col-md-8 px-0 right_mess">
                <div className="d-flex justify-content-center 
                align-items-center flex-column h-100">
                    {/* <i className="fab fa-facebook-messenger text-primary"
                    style={{fontSize: '5rem'}} /> */}
                    <svg aria-label="Direct" className="x1lliihq x1n2onr6"
                        color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)"
                        height="96" role="img" viewBox="0 0 96 96"
                        width="96"><title>Direct</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><line fill="none" stroke="currentColor"
                                stroke-linejoin="round" stroke-width="2" x1="69.286" x2="41.447" y1="33.21" y2="48.804"></line>
                        <polygon fill="none"
                            points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123" stroke="currentColor" strokeLinejoin="round"
                            strokeWidth="2">
                        </polygon>
                    </svg>
                    <h4>Your Messenger</h4>
                </div>
            </div>
        </div>
    )
}

export default Message
