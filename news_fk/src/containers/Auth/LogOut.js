import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout} from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class LogOut extends Component {
    componentDidMount() {
        setTimeout(this.props.logout,1000);
    }
    render() {
        if(this.props.userId) {
            return (<div><br/><br/><br/><h1>LOGGING USER OUT</h1></div>);
        }
        else {
            return <Redirect to="/" />;
        }
    }
};

const mapStateToProps = state => {
    return {
      userId : state.auth.userId
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(logout())
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(LogOut);