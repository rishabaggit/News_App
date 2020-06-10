import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout} from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
import { authAction } from 'store/actions/auth';
import { RootState } from 'index';


interface LogOutProps{
    logout: () => authAction;
    userId: string;
    cookies : any
}

class LogOut extends Component<LogOutProps> {
    componentDidMount() {
        (this.props.cookies).set('PrevUser','',{path: '/'});
        setTimeout(this.props.logout,500);
    }
    render() {
        if(this.props.userId) {
            return (<div><FullScreenLoader/></div>);
        }
        else {
            return <Redirect to="/" />;
        }
    }
};

const mapStateToProps = (state: RootState) => {
    return {
      userId : state.auth.userId
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = (dispatch) => {
    return {
        logout : () => dispatch(logout())
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(LogOut);