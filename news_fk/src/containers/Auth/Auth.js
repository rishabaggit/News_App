import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    render() {
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    console.log(this.state.email,this.state.password)
                    }}>
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

export default Auth;