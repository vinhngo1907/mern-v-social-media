import React from "react";

const ScrollTop = ({ scroll }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: scroll, behavior: 'smooth' })
    }
    return (
        <div id="topcontrol" title="Scroll Back to Top" onClick={scrollToTop}
            style={{
                position: "fixed", bottom: "10px", right: "5px", opacity: '1', cursor: "pointer"
            }}><i className="fa fa-angle-up" />
        </div>
    )
}

export default ScrollTop