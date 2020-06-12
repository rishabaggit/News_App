/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { db } from '../../components/UserAuthentication/firebase';
import { newMessage } from '../../components/UserData/FirestoreUtil';
import { connect } from 'react-redux';
import ChatSendMessage from '../../components/UI/ChatMessage/ChatSendMessage';
import ChatRecievedMessage from '../../components/UI/ChatMessage/ChatRecievedMessage';
import { Redirect } from 'react-router-dom';
import './Chat.css';

class Chat extends Component {
	state = {
		listMessage: [],
		message: ''
	}
	changeHandler = (event) => {
		this.setState({ [event.target.id]: event.target.value });
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
	sendMessage = (event) => {
		event.preventDefault();
		newMessage(this.props.userId, this.state.message);
		this.resetMessage();
	}
	resetMessage = () => {
		this.setState({ message: '' });
	}
	render() {
		if (!this.props.userId) {
			return <Redirect to='/signin' />;
		}
		return (
			<div className="container" style={{ marginTop: '80px', maxHeight: '400px' }}>
				<div className="cchat">
					{
						this.state.listMessage.map(obj => {
							console.log(obj.email, this.props.userId);
							if (obj.email === this.props.userId) {
								return <ChatSendMessage {...obj} />;
							}
							else {
								return <ChatRecievedMessage {...obj} />;
							}
						})
					}
				</div>
				<div className="container">
					<div class="input-group">

						<input
							value={this.state.message}
							placeholder='Enter new message'
							className="form-control"
							type='text'
							onChange={this.changeHandler}
							id='message'
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
						/>

						<div class="input-group-append">
							<button class="btn"
								type="button"
								onClick={this.sendMessage}>
								<i class="fa fa-paper-plane"
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