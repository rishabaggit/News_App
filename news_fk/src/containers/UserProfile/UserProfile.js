import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {userget}from '../../components/UserData/FirestoreUtil';

class UserProfile extends Component {
    componentDidMount() {
       userget('testdb@test.com');
    }
    render() {
        // if(this.props.userId === null) {
        //     return <Redirect to="/" />;
        // }
        return (
            <div>
                <br/><br/><br/>
                <h1>USER PROFILE</h1>
                {/* <button onClick={(event) => {
                    event.preventDefault();
                    userset('blahblah');
                    }}>ADD USER</button> */}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
      userId : state.auth.userId,
      darkMode: state.appModeReducer.darkMode,
      colorsObj: state.appModeReducer.colorsObj
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

// const mapDispatchToProps = dispatch => {
//     return {
//     }
//   };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, null)(UserProfile);