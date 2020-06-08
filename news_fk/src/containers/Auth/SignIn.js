import React, { Component } from 'react';
import { connect } from 'react-redux';
import {authWithEmail , authRefresh} from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Avatar from '../../resources/Avatar.jpg'
import './Login.css';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignIn extends Component {
    state = {
        email:'',
        password:''
    }

    showPassword = (event) => {
        
        var x = document.getElementById('myInput');
        
        if(x.type === 'password') {
            x.type = 'text';
        }
        else if(x.type === 'text') {
            x.type = 'password';
        }
    }
    changeHandler = (event) => {
        this.setState({[event.target.type] : event.target.value})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        const userData = {
            email:this.state.email,
            password:this.state.password
        }
        this.props.authWithEmail(userData , true);
    }
    render() {
        if(this.props.userId) {
            return <Redirect to="/" />;
        };
        if(this.props.loading) {
            return (<FullScreenLoader/>);
        }
        if(this.props.error) {
            toast.error(this.props.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                this.props.authRefresh();
                this.forceUpdate();
                
        }
        return (
            <div>
                <br/>
                <br/>
                <br/>
                {/* {this.props.error ? <h1>{this.props.error}</h1> : 'Enter Credentials'} */}
                
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <form style={{backgroundColor: this.props.colorsObj.formColor}} >
                    <div className="imgcontainer">
                        <img src={Avatar} alt="Avatar" className="avatar"/>
                    </div>
                    <div className="container1">
                        <label for="uname" style={this.props.colorsObj.textStyleMedium}><b>Username</b></label>
                        <input
                            value={this.state.email}
                            type='email'
                            placeholder='Enter your email ID'
                            onChange={this.changeHandler}
                            name="uname"
                        />
                        <label for="psw" style={this.props.colorsObj.textStyleMedium}><b>Password</b></label>
                        <input
                            value={this.state.password}
                            type='password'
                            placeholder='Password'
                            onChange={this.changeHandler}
                            name='psw'
                            id='myInput'
                        />
                        <input type="checkbox" onClick={this.showPassword}/><span> Show Password</span>
                    <button type='button' onClick={this.onSubmitHandler} className='b1'>SIGN IN</button>
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
        authWithEmail :(userData,type) => dispatch(authWithEmail(userData,type)),
        authRefresh : () => dispatch(authRefresh())
    }
  };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);