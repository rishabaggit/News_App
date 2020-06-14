import './UserProfile.css'
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RootState } from 'index';
import { ModeColors } from 'colors';
import Avatar from '../../resources/Avatar.jpg'
import { userget } from '../../Util/FirestoreUtil';
import FullScreenLoader from '../../components/UI/FullScreenLoader/FullScreenLoader'
import FetchErrorHandler from '../../components/UI/FetchErrorHandler/FetchErrorHandler'
import { UpdateProfile } from '../../Util/FirestoreUtil';
import { storage } from '../../components/UserAuthentication/firebase';

interface UserProfileProps {
    userId: string;
    colorsObj: ModeColors;

}
interface UserData {
    first_name: string | null,
    last_name: string | null,
    profession: string | null,
    bio: string | null,
    imageURL: string | null
}
interface UserProfileState {
    loading: boolean;
    userData: UserData | null | undefined | any;
    updatedUserData: UserData | null | undefined | any;
}
class UserProfile extends Component<UserProfileProps, UserProfileState> {
    state: UserProfileState = {
        loading: true,
        userData: null,
        updatedUserData: {
            first_name: "",
            last_name: "",
            profession: "",
            bio: "",
            imageURL: null
        }
    }
    componentDidMount() {
        if (this.props.userId === null) {
            console.log('PLease sign in')
        }
        else {
            userget(this.props.userId)
                .then(
                    doc => {
                        this.setState({ loading: false, userData: doc, updatedUserData: doc });
                    }
                )
                .catch(error => console.log(error));
        }
    }
    changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            updatedUserData: {
                ...this.state.updatedUserData,
                [event.currentTarget.id]: event.currentTarget.value
            }
        });
    }

    imageChangeHandler = (event: React.FormEvent<HTMLInputElement> | any) => {
        if (event.target.files[0]) {
            this.setState({ loading: true });
            const uploadTask = storage.ref(`Profile/${this.props.userId}`).put(event.target.files[0]);
            uploadTask.on(
                "state_changed",
                snapshot => {
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("Profile")
                        .child(this.props.userId)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({
                                updatedUserData: {
                                    ...this.state.updatedUserData,
                                    imageURL: url
                                },
                                loading: false
                            })
                        });
                }
            )
        };
    }
    updateInfo = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        UpdateProfile(this.props.userId, this.state.updatedUserData)
            .then(() => {
                this.setState({ userData: this.state.updatedUserData })
                toast.success('Profile Updated', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(e => console.log(e));
    }
    uploadpic = () => {
        var click1 = document.getElementById('imageUpload');
        click1.click();
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
                        <div className="card c1" style = {{backgroundColor: this.props.colorsObj.cardColor}}>
                            {this.state.userData.imageURL ?
                                <img src={this.state.userData.imageURL} alt="Avatar" style={{ width: '100%' }} /> :
                                <img src={Avatar} alt="Avatar" style={{ width: '100%' }} />
                            }
                            <div>
                                <h1 style = {this.props.colorsObj.textStyleHigh}>{this.state.userData.first_name}</h1>
                                <p className="title" style = {this.props.colorsObj.textStyleMedium}>{this.state.userData.profession}</p>
                                <p style = {this.props.colorsObj.textStyleLow}>{this.state.userData.bio}</p>
                            </div>
                        </div>
                    </div>
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
                    <form style={{ marginTop: 80, backgroundColor: this.props.colorsObj.formColor }}
                        className='f1'
                        onSubmit={this.updateInfo}>
                        <h1 style={{ color: 'black', fontFamily: 'Sofia' }}>Edit Your Details</h1>
                        <div className="imgcontainer">
                            {this.state.updatedUserData.imageURL ?
                                <img src={this.state.updatedUserData.imageURL} alt="Avatar" className="avatar" id='profilepic' onClick={this.uploadpic} /> :
                                <img src={Avatar} alt="Avatar" className="avatar" id='profilepic' onClick={this.uploadpic} />
                            }
                        </div>
                        <input id="imageUpload"
                            type="file"
                            onChange={this.imageChangeHandler}
                            name="profile_photo" placeholder="Photo" required capture ></input>
                        <div className="container1">

                            <label htmlFor="uname" style={this.props.colorsObj.textStyleMedium}><b>First Name</b></label>
                            <input
                                id='first_name'
                                type='text'
                                placeholder={this.state.userData.first_name}
                                name="uname"
                                onChange={this.changeHandler}
                                value={this.state.updatedUserData.first_name}
                            />
                            <label htmlFor="uname" style={this.props.colorsObj.textStyleMedium}><b>Last Name</b></label>
                            <input
                                id='last_name'
                                type='text'
                                placeholder={this.state.userData.last_name}
                                name="uname"
                                onChange={this.changeHandler}
                                value={this.state.updatedUserData.last_name}
                            />
                            <label htmlFor="psw" style={this.props.colorsObj.textStyleMedium}><b>Profession</b></label>
                            <input
                                id='profession'
                                type='text'
                                placeholder='Profession'
                                name="psw"
                                onChange={this.changeHandler}
                                value={this.state.updatedUserData.profession}
                            />
                            <label htmlFor="psw" style={this.props.colorsObj.textStyleMedium}><b>About Me</b></label>
                            <input
                                id='bio'
                                type='text'
                                placeholder='About Me'
                                name="psw"
                                onChange={this.changeHandler}
                                value={this.state.updatedUserData.bio}
                            />
                            <div id="nwl"></div>
                            <button onClick={this.updateInfo}
                                className='btn-primary b1'
                                type="button">Submit Details</button>
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
                    </form>
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