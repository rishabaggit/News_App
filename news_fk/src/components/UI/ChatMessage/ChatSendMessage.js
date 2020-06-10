import React from 'react';

const ChatSendMessage = (props) => {
    return (
    <div>
        <h5 style={{ color: 'green' }}>{props.username}</h5>
        <p>{props.message}</p>
    </div>
    );
}

export default ChatSendMessage;