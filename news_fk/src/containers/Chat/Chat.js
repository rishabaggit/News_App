import React, { Component } from 'react';
import {db} from '../../components/UserAuthentication/firebase';
import {newMessage} from '../../components/UserData/FirestoreUtil';
import { connect } from 'react-redux';
import ChatSendMessage from '../../components/UI/ChatMessage/ChatSendMessage'
import ChatRecievedMessage from '../../components/UI/ChatMessage/ChatRecievedMessage';
import {Redirect} from 'react-router-dom'

class Chat extends Component {
    state = {
        listMessage : [],
        message : ''
    }
    changeHandler = (event) => {
        this.setState({[event.target.id] : event.target.value})
        event.preventDefault();

    }
    componentDidMount() {
        db.collection('chat')
        .onSnapshot(
            snapshot => {
                snapshot.docChanges().forEach(change => {
                    console.log(change.doc.data().CHAT)
                        if(change.doc.data().CHAT === undefined)
                            this.setState({listMessage : []})
                        else
                            this.setState({listMessage : change.doc.data().CHAT})
                })
            },
            err => {
                console.log(err);
            }
        )
    }
    sendMessage = (event) => {
        event.preventDefault();
        newMessage(this.props.userId , this.state.message);
        // newMessage('mudreka@arif.com' , this.state.message);
        this.resetMessage();
    }
    resetMessage = () => {
        this.setState({message : ''})
    }
    // renderChat = () => {
    //     console.log('called')
    //     return(
        
    //     );

    // }
    render() {
        if(!this.props.userId) {
            return <Redirect to = '/signin'/>
        }
        return(
            <div style={{marginTop : "100px"}}>
                <h1>CHAT</h1>
                {
                    this.state.listMessage.map(obj=> {
                        console.log(obj.email,this.props.userId)
                        if(obj.email === this.props.userId) {
                            return <ChatSendMessage {...obj}/>
                        }
                        else {
                            return <ChatRecievedMessage {...obj}/>
                        }
                    })
                }
                <form onSubmit={this.sendMessage}>
                    <input 
                    value={this.state.message}
                    placeholder='Enter new message'
                    type='text'
                    onChange={this.changeHandler}
                    id='message'/>
                    <button>SEND</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      userId : state.auth.userId
    };
};

export default connect(mapStateToProps)(Chat);