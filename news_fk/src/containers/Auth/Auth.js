import React, { Component } from 'react';
import { connect } from 'react-redux';
import {auth} from '../../store/actions/index';
class Auth extends Component {
    state = {
        email:'',
        password:'',
        type : 'signIn'
    }
    emailChangeHandler = (event) => {
        this.setState({email : event.target.value})
    }
    passwordChangeHandler = (event) => {
        this.setState({password : event.target.value})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.email,this.state.password,this.state.type);
    }
    signInHandler = () => {this.setState({type : 'signIn'})};
    loginHandler = () => {this.setState({type : 'signUp'})};
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <button onClick={this.signInHandler}>SIGN IN</button>
                <button onClick={this.loginHandler}>LOGIN</button>
                <form onSubmit={this.onSubmitHandler}>
                    <input
                        value={this.state.email}
                        type='email'
                        placeholder='Enter your email ID'
                        onChange={this.emailChangeHandler}
                    />
                    <br/>
                    <input
                        value={this.state.password}
                        type='password'
                        placeholder='Password'
                        onChange={this.passwordChangeHandler}
                    />
                    <br/>
                    <button>{this.state.type === 'signIn' ? 'SIGN IN' : 'LOGIN'}</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      token : state.auth.token,
      userId : state.auth.userId,
      error : state.auth.error,
      loading: state.auth.loading
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = dispatch => {
    return {
        auth :(email,pass,type) => dispatch(auth(email,pass,type))
    }
  };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, mapDispatchToProps)(Auth);