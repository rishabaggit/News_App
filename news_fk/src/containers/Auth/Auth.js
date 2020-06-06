import React, { Component } from 'react';
import { connect } from 'react-redux';
import {auth,authRedirectToggle , authSuccess} from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { app, facebookProvider } from '../../components/UserAuthentication/firebase'
class Auth extends Component {
    constructor(props) {
        super(props)
        this.authWithFacebook = this.authWithFacebook.bind(this);
      }
    state = {
        email:'',
        password:'',
        type : 'signIn'
    }
    authWithFacebook() {
        app.auth().signInWithPopup(facebookProvider)
          .then((result, error) => {
            if (error) {
              console.log('error');
            } else {
              console.log('logged in');
              this.props.authSuccess(result.additionalUserInfo.profile.email);
            }
          })
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
        // if(this.props.redirect) {
        //     this.props.redirectTogFunc(false);
        //     return <Redirect to="/" />;
        // };
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
                <button onClick={this.authWithFacebook} >LOGIN WITH FACEBOOK</button>
                <h1>{this.props.userId}</h1>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      userId : state.auth.userId,
      error : state.auth.error,
      loading: state.auth.loading,
      redirect : state.auth.redirect_after_login
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = dispatch => {
    return {
        auth :(email,pass,type) => dispatch(auth(email,pass,type)),
        redirectTogFunc : (tog) => dispatch(authRedirectToggle(tog)),
        authSuccess : (email) => dispatch(authSuccess(email))
    }
  };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, mapDispatchToProps)(Auth);