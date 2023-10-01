import React from "react";

function ChatBox({ selectedUser, messages }) {
    return (
        <div className="chat-box">
            <h2>Chat with {selectedUser.fullName}</h2>
            {messages.map((message, index) => (
                <div className="chat-message" key={index}>
                    <div className="sender-name">{message.sender}</div>
                    <div>{message.text}</div>
                    <div className="message-timestamp">{message.timestamp}</div>
                </div>
            ))}
        </div>
    );
}

export default ChatBox;