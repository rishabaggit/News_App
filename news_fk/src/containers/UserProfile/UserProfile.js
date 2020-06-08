import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {userget}from '../../components/UserData/FirestoreUtil';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
import Avatar from '../../resources/Avatar.jpg'
import FetchErrorHandler from '../../components/UI/FetchErrorHandler/FetchErrorHandler'

class UserProfile extends Component {
    state =  {
        loading : true,
        userData : null
    }
    componentDidMount() {
        if(this.props.userId === null) {
            console.log('PLease sign in')
        }
        else {
            userget(this.props.userId).then(
                doc => {
                    this.setState({loading : false, userData : doc});
                }
            )
            .catch(error => console.log(error));
        }
    }
    render() {
        if(this.props.userId === null) {
            return <Redirect to="/signin" />;
        }
        if(this.state.loading) {
            return <FullScreenLoader/>;
        }
        if(!this.state.userData) {
            console.log('ERROR PAGE');
            return <FetchErrorHandler />
        }
        return (
            <div>
                <br/><br/><br/>
                <h1>USER PROFILE</h1>
                <div className="imgcontainer">
                        <img src={Avatar} alt="Avatar" className="avatar"/>
                </div>
                <h1>{this.state.userData.first_name}</h1>
                <h1>{this.state.userData.last_name}</h1>
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