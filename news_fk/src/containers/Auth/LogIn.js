import React, { Component } from 'react';
import { connect } from 'react-redux';
import {authWithEmail,authWithFacebook} from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import './Login.css'
import Avatar from '../../resources/Avatar.jpg'
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
class LogIn extends Component {
    state = {
        email:'',
        password:'',
        password2:''
    }
    changeHandler = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }
    onSubmitHandler = (event) => {
        if(this.state.password != this.state.password2) {
            console.log('password not matching');
        }
        event.preventDefault();
        this.props.authWithEmail(this.state.email,this.state.password , false);
    }
    render() {
        if(this.props.userId) {
            return <Redirect to="/" />;
        };
        if(this.props.loading) {
            return (<FullScreenLoader/>);
        }
        return (
            <div>
                <br/>
                <br/>
                <br/>
                {/* {this.props.error ? <h1>{this.props.error}</h1> : 'Enter Credentials'} */}
                <form onSubmit={this.onSubmitHandler} style={{backgroundColor: this.props.colorsObj.formColor}}>
                    <div className="imgcontainer">
                        <img src={Avatar} alt="Avatar" className="avatar"/>
                    </div>
                    <div className="container1">
                        <label for="uname" style={this.props.colorsObj.textStyleMedium}><b>Username</b></label>
                        <input
                        id='email'
                        value={this.state.email}
                        type='email'
                        placeholder='Enter your email ID'
                        onChange={this.changeHandler}
                        name="uname"
                        />

                        <label for="psw" style={this.props.colorsObj.textStyleMedium}><b>Password</b></label>
                        <input
                        id='password'
                        value={this.state.password}
                        type='password'
                        placeholder='Password'
                        onChange={this.changeHandler}
                        name="psw"
                        />
                        <label for="psw" style={this.props.colorsObj.textStyleMedium}><b>Re-enter Password</b></label>
                        <input
                        id='password2'
                        value={this.state.password2}
                        type='password'
                        placeholder='Re-enter Password'
                        onChange={this.changeHandler}
                        name="psw"
                        />
                        <button onClick={this.onSubmitHandler} className='b1' type="button">LOGIN</button>
                        <button className='b1' type="button" onClick={this.props.authWithFacebook} >LOGIN WITH FACEBOOK</button>
                    </div>
                </form>
                
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      userId : state.auth.userId,
      error : state.auth.error,
      loading: state.auth.loading,
      darkMode: state.appModeReducer.darkMode,
      colorsObj: state.appModeReducer.colorsObj
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = dispatch => {
    return {
        authWithEmail :(email,pass,type) => dispatch(authWithEmail(email,pass,type)),
        authWithFacebook : () => dispatch(authWithFacebook())
    }
  };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);