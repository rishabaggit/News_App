/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import './Chat.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { db } from '../../components/UserAuthentication/firebase';
import { newMessage } from '../../components/UserData/FirestoreUtil';
import ChatSendMessage from '../../components/UI/ChatMessage/ChatSendMessage';
import ChatRecievedMessage from '../../components/UI/ChatMessage/ChatRecievedMessage';

interface ChatProps {
	userId: string;

}
interface ChatState {
	listMessage: Array<Object>;
	message: string
}
class Chat extends Component<ChatProps, ChatState>{
	state = {
		listMessage: [],
		message: ''
	}
	changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
		this.setState({ message: event.currentTarget.value });
		event.preventDefault();

	}
	componentDidMount() {
		db.collection('chat')
			.onSnapshot(
				snapshot => {
					snapshot.docChanges().forEach(change => {
						if (change.doc.data().CHAT === undefined)
							this.setState({ listMessage: [] });
						else
							this.setState({ listMessage: change.doc.data().CHAT.reverse() });
					});
				},
				err => {
					console.log(err);
				}
			);
	}
	sendMessage = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		newMessage(this.props.userId, this.state.message);
		this.resetMessage();
	}
	resetMessage = () => {
		this.setState({ message: '' });
	}
	enterHandler = (e) => {
		if (e.key === 'Enter') {
			this.sendMessage(e);
		}
	}
	render() {
		if (!this.props.userId) {
			return <Redirect to='/signin' />;
		}
		return (
			<div className="container" style={{ marginTop: '80px', maxHeight: '400px' }}>
				<div className="cchat">
					{
						this.state.listMessage.map((obj, idx) => {
							if (obj.email === this.props.userId) {
								return <ChatSendMessage {...obj} key={idx} />;
							}
							else {
								return <ChatRecievedMessage {...obj} key={idx} />;
							}
						})
					}
				</div>
				<div className="container">
					<div className="input-group">
						<input
							value={this.state.message}
							placeholder='Enter new message'
							className="form-control"
							type='text'
							onChange={this.changeHandler}
							onKeyDown={this.enterHandler}
							id='message'
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
						/>
						<div className="input-group-append">
							<button className="btn"
								type="button"
								onClick={this.sendMessage}>
								<i className="fa fa-paper-plane"
									aria-hidden="true">
								</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		userId: state.auth.userId
	};
};

export default connect(mapStateToProps)(Chat);