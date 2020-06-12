/* eslint-disable no-unused-vars */
import React from 'react';
import './Chat.css';
import Avatar from '../../../resources/Avatar.jpg';

interface ChatProps {
	username: string,
	message: string
}
const ChatRecievedMessage = (props: ChatProps) => {
	return (
		<div className="container3 container">
			<img src={Avatar} alt="Avatar"></img>
			<h5>{props.username}</h5>
			<p>{props.message}</p>
		</div>
	);
};

export default ChatRecievedMessage;