// eslint-disable-next-line no-unused-vars
import './Chat.css';
import React from 'react';
import Avatar from '../../../resources/Avatar.jpg';

interface ChatProps {
	username: string,
	message: string,
	time: string,
	image: string
}
const ChatSendMessage = (props: ChatProps) => {
	return (
		<div className="container3 container darker">
			{props.image ?
				<img src={props.image} alt="Avatar" className="right"></img> :
				<img src={Avatar} alt="Avatar" className="right"></img>
			}
			<h5 className="sending">{props.username}</h5>
			<p className="sending">{props.message}</p>
			<span className="time-left"><p>{props.time}</p></span>
		</div>
	);
};

export default ChatSendMessage;