import React from "react";

function ChatBox({ selectedUser }) {
    console.log({selectedUser});
    return (
        <div className="chat-box">
            <h2>Chat with {selectedUser.fullName}</h2>
            {/* Add chat messages here */}
        </div>
    );
}

export default ChatBox;