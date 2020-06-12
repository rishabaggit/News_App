import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader';
import { RootState } from 'index';
import { ModeColors } from 'colors';
import * as cookiesUtil from '../../Util/cookiesUtil';
import { authWithEmail, authWithFacebook, authRefresh } from '../../store/actions/index';
import { authAction } from 'store/actions/auth';
import Avatar from '../../resources/Avatar.jpg';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { Cookies } from 'react-cookie';

interface Userdata {
    email: string;
    password: string;
    fname: string;
    lname: string;
}

interface LogInProps {
    authWithEmail: (userData: Userdata, type: boolean) => void;
    userId: string;
    loading: boolean;
    error: string;
    authRefresh: () => authAction;
    colorsObj: ModeColors;
    authWithFacebook: () => void;
    cookies: Cookies;
}

class LogIn extends Component<LogInProps> {
    state = {
        email: '',
        password: '',
        password2: '',
        fname: '',
        lname: '',
    }

    componentWillUnmount() {
        if (this.props.userId) {
            cookiesUtil.signInHandler(this.props.cookies, this.props.userId);
        }
    }
    validate = (event: React.FormEvent<HTMLInputElement>) => {
        var pass = (event.currentTarget).value;
        var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;;
        var test = reg.test(pass);
        var message = document.getElementById('nwl');
        if (!test) {
            message.style.color = "red";
            message.style.fontSize = "12px";
            message.innerHTML = "Password between 7 to 15 characters, One Numeric & One Special Character";
        }
        else {
            message.innerHTML = "";
        }
    }
    changeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }
    onSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
            fname: this.state.fname,
            lname: this.state.lname
        }
        this.props.authWithEmail(userData, false);
    }
    render() {
        if (this.props.userId) {
            return <Redirect to="/" />;
        };
        if (this.props.loading) {
            return (<FullScreenLoader />);
        }
        if (this.props.error) {
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
                <br /><br /><br />
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
                <form onSubmit={this.onSubmitHandler} style={{ backgroundColor: this.props.colorsObj.formColor }}>
                    <button className='b2' type="button" onClick={this.props.authWithFacebook} >LOGIN WITH FACEBOOK</button>
                    <div className="imgcontainer">
                        <img src={Avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div className="container1">
                        <label htmlFor="uname" style={this.props.colorsObj.textStyleMedium}><b>Email ID</b></label>
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
                            type="button">SIGN UP</button>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading,
        darkMode: state.appModeReducer.darkMode,
        colorsObj: state.appModeReducer.colorsObj
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        authWithEmail: (userData: Userdata, type: boolean) => dispatch(authWithEmail(userData, type)),
        authWithFacebook: () => dispatch(authWithFacebook()),
        authRefresh: () => dispatch(authRefresh())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);