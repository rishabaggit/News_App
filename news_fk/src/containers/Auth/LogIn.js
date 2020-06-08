/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {authWithEmail,authWithFacebook} from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import './Login.css';
import Avatar from '../../resources/Avatar.jpg';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LogIn extends Component {
    state = {
    	email:'',
    	password:'',
    	password2:'',
    	fname: '',
    	lname: ''
    }

    validate = (event) => {
    	var pass = event.target.value;
    	var reg =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    	var test = reg.test(pass);
    	var message = document.getElementById('nwl');
    	if (!test) {
    		message.style.color='red';
    		message.style.fontSize='12px';
    		message.innerHTML = 'Password between 7 to 15 characters, One Numeric & One Special Character';
    	}   
    	else{
    		message.innerHTML = '';
    	}        
    }
    changeHandler = (event) => {
    	this.setState({[event.target.id] : event.target.value});
    }
    onSubmitHandler = (event) => {
    	event.preventDefault();
    	const userData = {
    		email:this.state.email,
    		password:this.state.password,
    		fname: this.state.fname,
    		lname: this.state.lname
    	};
    	this.props.authWithEmail(userData , false);
    }
    render() {
    	if(this.props.userId) {
    		return <Redirect to="/" />;
    	}
    	if(this.props.loading) {
    		return (<FullScreenLoader/>);
    	}
    	if(this.props.error) {
    		toast.error(this.props.error, {
    			position: 'top-center',
    			autoClose: 5000,
    			hideProgressBar: false,
    			closeOnClick: true,
    			pauseOnHover: true,
    			draggable: true,
    			progress: undefined,
    		});
    	}
    	return (
    		<div>
    			<br/>
    			<br/>
    			<br/>
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
    			{/* {this.props.error ? <h1>{this.props.error}</h1> : 'Enter Credentials'} */}
    			<form onSubmit={this.onSubmitHandler} style={{backgroundColor: this.props.colorsObj.formColor}}>
    				{/* <button className='b2' type="button" onClick={this.props.authWithFacebook} >LOGIN WITH FACEBOOK</button> */}
    				<div className="imgcontainer">
    					<img src={Avatar} alt="Avatar" className="avatar"/>
    				</div>
    				<div className="container1">
    					<label htmlFor="uname" style={this.props.colorsObj.textStyleMedium}><b>Username</b></label>
    					<input
    						id='email'
    						value={this.state.email}
    						type='email'
    						placeholder='Enter your email ID'
    						onChange={this.changeHandler}
    						name="uname"
    					/>
    					<label htmlFor="uname" style={this.props.colorsObj.textStyleMedium}><b>First Name</b></label>
    					<input
    						id='fname'
    						value={this.state.fname}
    						type='text'
    						placeholder='First Name'
    						onChange={this.changeHandler}
    						name="uname"
    					/>
    					<label htmlFor="uname" style={this.props.colorsObj.textStyleMedium}><b>Last Name</b></label>
    					<input
    						id='lname'
    						value={this.state.lname}
    						type='text'
    						placeholder='Last Name'
    						onChange={this.changeHandler}
    						name="uname"
    					/>
    					<label htmlFor="psw" style={this.props.colorsObj.textStyleMedium}><b>Password</b></label>
    					<input
    						id='password'
    						value={this.state.password}
    						type='password'
    						placeholder='Password'
    						onChange={this.changeHandler}
    						onInput={this.validate}
    						name="psw"
    					/>
    					<div id="nwl"></div>
    					<label htmlFor="psw" style={this.props.colorsObj.textStyleMedium}><b>Re-enter Password</b></label>
    					<input
    						id='password2'
    						value={this.state.password2}
    						type='password'
    						placeholder='Re-enter Password'
    						onChange={this.changeHandler}
    						name="psw"
    					/>
    					<button 
    						disabled={this.state.password !== this.state.password2} 
    						onClick={this.onSubmitHandler} 
    						className='b1' 
    						type="button">LOGIN</button>
    				</div>
    			</form>
                
    		</div>
    	);
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
		authWithFacebook : () => dispatch(authWithFacebook())
	};
};
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);