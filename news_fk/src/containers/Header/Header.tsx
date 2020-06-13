import './Header.css';
import React, { Component } from 'react';
import { Cookies } from 'react-cookie';
import { Link, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'index';
import { ModeColors } from 'colors';
import * as actionTypes from '../../store/actions/index';
import * as cookiesUtil from '../../Util/cookiesUtil'
import { newsFetchAction } from 'store/actions/news';
import { appModeAction } from 'store/actions/darkMode';
import { authAction } from 'store/actions/auth';
import { authSuccess } from '../../store/actions/index';
// import CountryNavItem from './NavItems/CountryNavItem'
import CategoryNavItem from './NavItems/CategoryNavItem'

interface HeaderProps {
    countryChangeHandler: (newCountry: string) => newsFetchAction;
    newsHandler: () => void;
    categoryChangeHandler: (newCategory: string) => newsFetchAction;
    colorsObj: ModeColors;
    countrycode: string;
    newscategory: string;
    cookies: Cookies;
    user: string | any;
    darkMode: boolean;
    flipDarkMode: () => appModeAction;
    authSuccess: (email: string) => authAction;
}

class Header extends Component<HeaderProps> {

    componentDidMount() {
        cookiesUtil.initializeDarkMode(this.props.cookies);
        const prevMode = cookiesUtil.getDarkMode(this.props.cookies) === 'true';
        if (prevMode !== this.props.darkMode) {
            this.darkModeFlipper();
        }
        cookiesUtil.checkSignIn(this.props.cookies, this.props.authSuccess)
    }
    darkModeFlipper = () => {
        cookiesUtil.setDarkMode(this.props.cookies, !this.props.darkMode);
        this.props.flipDarkMode();
    }

    countryChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
        window.scrollTo(0,0);
        this.props.countryChangeHandler(event.currentTarget.value);
        this.props.newsHandler();
    }
    categoryChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
        window.scrollTo(0,0);
        this.props.categoryChangeHandler(event.currentTarget.value);
        this.props.newsHandler();
    }
    userDropDown = (isAuthenticated: boolean) => {
        if (isAuthenticated) {
            return (
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/userProfile">My Profile</Link>
                    <Link className="dropdown-item" to="/likedPosts">Liked Posts</Link>
                    <Link className="dropdown-item" to="/chat">Chat</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/logout">Logout</Link>
                </div>
            );
        }
        else {
            return (
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/login">Sign Up</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/signin">Sign In</Link>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top"
                    style={this.props.colorsObj.navBarStyle}>
                    <div className="container">
                        <NavLink className="nav-link l2" exact to="/"
                            style={this.props.colorsObj.navLinkStyle}>
                            <i className="fa fa-globe"
                                aria-hidden="true"></i>
                            fLipkart News App
                        </NavLink>
                        <NavLink className="nav-link l1" exact to="/info"
                            style={this.props.colorsObj.navLinkStyle}>
                            Team
                        </NavLink>
                        <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ml-auto">
                                {/* <Route path="/" exact render={() => (
                                    <CountryNavItem
                                        country={this.props.countrycode}
                                        countryChangeHandler={this.countryChangeHandler}
                                    />
                                )} /> */}
                                <Route path="/" exact render={() => (
                                    <CategoryNavItem
                                        category={this.props.newscategory}
                                        country={this.props.countrycode}
                                        categoryChangeHandler={this.categoryChangeHandler}
                                    />
                                )} />
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"
                                        href="#/" id="navbarDropdown"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="fa fa-user" aria-hidden="true"
                                            style={this.props.colorsObj.dropdown}></i>
                                    </a>
                                    {this.userDropDown(this.props.user)}
                                </li>
                                <li className="nav-item dropdown">

                                    {this.props.darkMode ?
                                        <i className="fa fa-sun-o" aria-hidden="true"
                                            onClick={this.darkModeFlipper}></i> :
                                        <i className="fa fa-moon-o" aria-hidden="true"
                                            onClick={this.darkModeFlipper}></i>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: any) => {
    return {
        countrycode: state.newsFetchReducer.countrycode,
        newscategory: state.newsFetchReducer.newscategory,
        user: state.auth.userId,
        darkMode: state.appModeReducer.darkMode,
        colorsObj: state.appModeReducer.colorsObj,
        cookies: ownProps.cookies
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        newsHandler: () => dispatch(actionTypes.newsHandler()),
        countryChangeHandler: (newCountry: string) => dispatch(actionTypes.countryChangeHandler(newCountry)),
        categoryChangeHandler: (newCategory: string) => dispatch(actionTypes.categoryChangeHandler(newCategory)),
        flipDarkMode: () => dispatch(actionTypes.flipDarkMode()),
        authSuccess: (email: string) => dispatch(authSuccess(email))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);