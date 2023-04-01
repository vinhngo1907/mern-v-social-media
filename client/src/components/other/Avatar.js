import React from "react";
const Avatar = ({src, size})=>{
    return (
        <img src={src} className={`${size}`} alt="avatar"/>
    )
}
export default Avatar;