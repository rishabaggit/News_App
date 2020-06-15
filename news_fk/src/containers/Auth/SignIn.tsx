import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ModeColors } from 'colors';
import { RootState } from 'index';
import * as cookiesUtil from '../../Util/cookiesUtil';
import { authRefreshAction } from 'store/actions/auth';
import { forgetPassword } from '../../Util/FirestoreUtil'
import { authWithEmail, authRefresh } from '../../store/actions/index';
import Avatar from '../../resources/Avatar.jpg'
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'

interface Userdata {
    email: string;
    password: string;
}

interface SignInProps {
    authWithEmail: (userData: Userdata, type: boolean) => void;
    userId: string;
    loading: boolean;
    error: string;
    authRefresh: () => authRefreshAction;
    colorsObj: ModeColors;
    cookies: Cookies;
}

interface SignInState {
    email: string;
    password: string;
    [x: number]: any;
}
class SignIn extends Component<SignInProps, SignInState> {
    state = {
        email: '',
        password: ''
    }
    componentWillUnmount() {
        if (this.props.userId) {
            cookiesUtil.signInHandler(this.props.cookies, this.props.userId);
        }
    }
    showPassword = () => {
        var x = document.getElementById('password');
        if ((x as any).type === 'password') {
            (x as any).type = 'text';
        }
        else if ((x as any).type === 'text') {
            (x as any).type = 'password';
        }
    }

    changeHandler = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    onSubmitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.authWithEmail(userData, true);
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
                <form onSubmit={this.onSubmitHandler} style={{ backgroundColor: this.props.colorsObj.formColor }} className='flog' >
                    <div className="imgcontainer">
                        <img src={Avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div className="container1">
                        <label htmlFor="uname" style={this.props.colorsObj.textStyleMedium}><b>Username</b></label>
                        <input
                            value={this.state.email}
                            type='email'
                            placeholder='Enter your email ID'
                            onChange={this.changeHandler}
                            name="uname"
                            id='email'
                        />
                        <label htmlFor="psw" style={this.props.colorsObj.textStyleMedium}><b>Password</b></label>
                        <input
                            value={this.state.password}
                            type='password'
                            placeholder='Password'
                            onChange={this.changeHandler}
                            name='psw'
                            id='password'
                        />
                        <input type="checkbox" onClick={this.showPassword} /><span> Show Password</span>
                        <button type="button" onClick={() => forgetPassword(this.state.email)} className="b1">Reset Password</button>

                        <button type='button' onClick={this.onSubmitHandler} className='b1'>SIGN IN</button>
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
        authWithEmail: (userData: Userdata | any, type: boolean) => dispatch(authWithEmail(userData, type)),
        authRefresh: () => dispatch(authRefresh()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);