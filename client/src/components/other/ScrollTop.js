import React from "react";

const ScrollTop = () => {
    return (
        <div id="topcontrol" title="Scroll Back to Top"
            style={{
                position: "fixed", bottom: "10px", right: "5px", opacity: '1', cursor: "pointer"
            }}><i className="fa fa-angle-up" />
        </div>
    )
}

export default ScrollTop