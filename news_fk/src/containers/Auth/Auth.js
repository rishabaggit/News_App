import React, { Component } from 'react';
import { connect } from 'react-redux';
import {auth} from '../../store/actions/index';
class Auth extends Component {
    state = {
        email:'',
        password:''
    }
    emailChangeHandler = (event) => {
        this.setState({email : event.target.value})
    }
    passwordChangeHandler = (event) => {
        this.setState({password : event.target.value})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.email,this.state.password);
        this.props.auth(this.state.email,this.state.password);
    }
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <form onSubmit={this.onSubmitHandler}>
                    <input
                        value={this.state.email}
                        type='email'
                        placeholder='Enter your email ID'
                        onChange={this.emailChangeHandler}
                    />
                    <input
                        value={this.state.password}
                        type='password'
                        placeholder='Password'
                        onChange={this.passwordChangeHandler}
                    />
                    <button>SUBMIT</button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      countrycode : state.countrycode,
      newscategory : state.newscategory,
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = dispatch => {
    return {
        auth : dispatch((email,pass) => auth(email,pass))
    }
  };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, mapDispatchToProps)(Auth);