// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Chat.css';
import Avatar from '../../../resources/Avatar.jpg';


const ChatSendMessage = (props) => {
	return (
		<div className="container3 container darker">
			<img src={Avatar} alt="Avatar" className="right"></img>
			<h5 className="sending">{props.username}</h5>
			<p className="sending">{props.message}</p>
		</div>
	);
};

export default ChatSendMessage;