import './UserProfile.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { RootState } from 'index';
import { ModeColors } from 'colors';
import Avatar from '../../resources/Avatar.jpg'
import { userget } from '../../Util/FirestoreUtil';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
import FetchErrorHandler from '../../components/UI/FetchErrorHandler/FetchErrorHandler'

interface UserProfileProps {
    userId: string;
    colorsObj: ModeColors;

}
interface UserProfileState {
    loading: boolean;
    userData: {
        first_name: string,
        last_name: string
    } | any;
}
class UserProfile extends Component<UserProfileProps, UserProfileState> {
    state: UserProfileState = {
        loading: true,
        userData: null
    }
    componentDidMount() {
        if (this.props.userId === null) {
            console.log('PLease sign in')
        }
        else {
            userget(this.props.userId)
                .then(
                    doc => {
                        this.setState({ loading: false, userData: doc });
                    }
                )
                .catch(error => console.log(error));
        }
    }
    render() {
        if (this.props.userId === null) {
            return <Redirect to="/signin" />;
        }
        if (this.state.loading) {
            return <FullScreenLoader />;
        }
        if (!this.state.userData) {
            return <FetchErrorHandler />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="column col-md-4 col-12">
                        <div className="card c1">
                            <img src={Avatar} alt="Avatar" style={{ width: '100%' }} />
                            <h1>{this.state.userData.first_name}</h1>
                            <p className="title">PROFESSION</p>
                            <p>INSTITUTION</p>
                            <p>
                                <a href="#/"><i className="fa fa-dribbble fa1"></i></a>
                                <a href="#/"><i className="fa fa-twitter fa1"></i></a>
                                <a href="#/"><i className="fa fa-linkedin fa1"></i></a>
                                <a href="#/"><i className="fa fa-facebook fa1"></i></a>
                            </p>
                        </div>
                    </div>
                    <div className="column col-md-8 col-12">
                        <div className="vertically-center">
                            <h1 className="bannerUser"
                                style={this.props.colorsObj.textStyleHigh}>
                                Hi {this.state.userData.first_name} {this.state.userData.last_name}
                            </h1 >
                            <p style={this.props.colorsObj.textStyleHigh}>
                                We hope and expect, your user experience till now must have been extremely good.
                            </p>
                            <p style={this.props.colorsObj.textStyleHigh}>
                                In case of any queries, please contact
                            <NavLink to="/info" exact className="nav-link l5">
                                    here
                            </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state: RootState) => {
    return {
        userId: state.auth.userId,
        darkMode: state.appModeReducer.darkMode,
        colorsObj: state.appModeReducer.colorsObj
    };
};

export default connect(mapStateToProps)(UserProfile);