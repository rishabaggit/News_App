import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {userget}from '../../components/UserData/FirestoreUtil';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
import Avatar from '../../resources/Avatar.jpg'
import FetchErrorHandler from '../../components/UI/FetchErrorHandler/FetchErrorHandler'
import './UserProfile.css'
import {NavLink} from 'react-router-dom';

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
            // <div>
            //     <br/><br/><br/>
            //     <h1>USER PROFILE</h1>
            //     <div className="imgcontainer">
            //             <img src={Avatar} alt="Avatar" className="avatar"/>
            //     </div>
            //     <h1>{this.state.userData.first_name}</h1>
            //     <h1>{this.state.userData.last_name}</h1>
            // </div>
            <div className="container">
                <div className="row">
                    <div className="column col-md-4">
                        <div class="card c1">
                            <img src={Avatar} alt="Avatar" style={{width:'100%'}}/>
                            <h1>{this.state.userData.first_name}</h1>
                            <p class="title">Student</p>
                            <p>MNNIT Allahabad</p>
                            <p>
                                <a href="#/"><i className="fa fa-dribbble fa1"></i></a>
                                <a href="#/"><i className="fa fa-twitter fa1"></i></a>
                                <a href="#/"><i className="fa fa-linkedin fa1"></i></a>
                                <a href="#/"><i className="fa fa-facebook fa1"></i></a>
                            </p>
                        </div>
                    </div>
                    <div className="column col-md-8">
                        <div className="vertically-center">
                            <h1 className="bannerUser">Hi {this.state.userData.first_name} {this.state.userData.last_name}</h1 >
                            <p>We hope and expect, your user experience till now must have extremely good.</p>
                            <p>In case of any queries, please contact <NavLink to="/info" exact className="nav-link">here</NavLink></p>
                        </div>
                        
                    </div>
                </div>
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