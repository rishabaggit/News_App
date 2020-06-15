import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import ReactGA from 'react-ga';
import { Redirect } from 'react-router-dom';
import { RootState } from 'index';
import { logout } from '../../store/actions/index';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
import * as cookiesUtil from '../../Util/cookiesUtil';
import { authAction } from 'store/actions/auth';


interface LogOutProps {
    logout: () => authAction;
    userId: string,
    cookies: Cookies
}

class LogOut extends Component<LogOutProps> {
    componentDidMount() {
        ReactGA.event({
            category: 'Authentication',
            action: 'User Logged Out'
        });
        cookiesUtil.signOutHandler(this.props.cookies);
        setTimeout(this.props.logout, 500);
    }
    render() {
        if (this.props.userId) {
            return (<div><FullScreenLoader /></div>);
        }
        else {
            return <Redirect to="/" />;
        }
    }
};

const mapStateToProps = (state: RootState) => {
    return {
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);