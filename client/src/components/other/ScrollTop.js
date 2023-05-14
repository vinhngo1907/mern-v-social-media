import React from "react";

const ScrollTop = ({ scroll }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div id="topcontrol" title="Scroll Back to Top" onClick={scrollToTop}
            style={{
                position: "fixed", bottom: "10px", right: "5px", 
                opacity: scroll > 100 ? 1 : 0, 
                cursor: "pointer"
            }}>
                <i className="fa fa-angle-up" />
        </div>
    )
}

export default ScrollTop