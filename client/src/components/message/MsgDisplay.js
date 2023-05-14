import React from "react";
import Avatar from "../other/Avatar";

const MsgDisplay = ({user}) =>{
    return (
        <>
              <div className="chat_title">
                <Avatar src={user.avatar} size="small-avatar" />
                <span>{user.username}</span>
            </div>
        </>
    )
}

export default MsgDisplay;