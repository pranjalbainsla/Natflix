import React from 'react';

const Chat = ({ movie : {overview }, onClick }) => {
    return (
        <div className="chat-card" onClick={onClick}>
            <p>{overview}</p>
            <ul>
                <li>first text</li>
                <li>second list</li>
            </ul>
        </div>
    )
}

export default Chat
