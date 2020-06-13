/* eslint-disable no-unused-vars */
import React from 'react';
import './Chat.css';
import Avatar from '../../../resources/Avatar.jpg';

interface ChatProps {
	username: string,
	message: string,
	time: string
}
const ChatRecievedMessage = (props: ChatProps) => {
	return (
		<div className="container3 container recieved">
			<img src={Avatar} alt="Avatar"></img>
			<h5>{props.username}</h5>
			<p>{props.message}</p>
			<span className="time-right"><p style={{ color: 'black' }}>{props.time}</p></span>
		</div>
	);
};

export default ChatRecievedMessage;