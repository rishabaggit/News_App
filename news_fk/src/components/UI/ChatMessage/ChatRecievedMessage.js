import React from 'react';

const ChatRecievedMessage = (props) => {
    return (
    <div>
        <h5 style={{ color: 'red' }}>{props.username}</h5>
        <p>{props.message}</p>
    </div>
    );
}

export default ChatRecievedMessage;