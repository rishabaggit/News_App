// PURPOSE: Display the Header/NavBar of the Page responsible for displaying links, category and country change option and brand name.
// Called from App.js
//---------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in Header.js

import React, { Component } from 'react';
import './Header.css';
import {Link , NavLink} from 'react-router-dom';
import CountryNavItem from './NavItems/CountryNavItem'
import CategoryNavItem from './NavItems/CategoryNavItem'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import {Route} from 'react-router-dom';
import { RootState } from 'index';
import { newsFetchAction } from 'store/actions/news';
import { appModeAction } from 'store/actions/darkMode';
import { authAction} from 'store/actions/auth';
import { ModeColors } from 'colors';
import {authSuccess} from '../../store/actions/index';


//---------------------------------------------------------------------------------------------------------

interface HeaderProps{
    countryChangeHandler: (newCountry:string) => newsFetchAction;
    newsHandler: any;
    categoryChangeHandler: (newCategory: string) => newsFetchAction;
    colorsObj: ModeColors;
    countrycode: string;
    newscategory: string;
    cookies :any
    user: any;
    darkMode: boolean;
    flipDarkMode: () => appModeAction;
    authSuccess : (email : string) => authAction;
}

interface HeaderState{

}

class Header extends Component<HeaderProps, HeaderState> {

    componentDidMount() {
        if((this.props.cookies).get('DarkMode') === null || (this.props.cookies).get('DarkMode') === undefined )
          {
            (this.props.cookies).set('DarkMode',false,{path: '/'})
          }
        const prevMode = (this.props.cookies).get('DarkMode') === "true";
        if(prevMode !== this.props.darkMode) {
            this.darkModeFlipper();
        }
        // console.log((this.props.cookies).get('PrevUser'));
        if((this.props.cookies).get('PrevUser') !== null || 
            (this.props.cookies).get('PrevUser') !== undefined ||
            (this.props.cookies).get('PrevUser') !== '') {
            this.props.authSuccess((this.props.cookies).get('PrevUser'));
        }
    }
    darkModeFlipper = () => {
        (this.props.cookies).set('DarkMode',!this.props.darkMode,{path: '/'});
        this.props.flipDarkMode();
    }

                    //function registered for listening to event and further for changing country in background and fetching news for same
    countryChangeHandler = (event) => {
        this.props.countryChangeHandler((event.target as any).value);
        this.props.newsHandler();
    }
                    //function registered for listening to event and further for changing category in background and fetching news for same
    categoryChangeHandler = (event) => {
        this.props.categoryChangeHandler((event.target as any).value);
        this.props.newsHandler();
    }
    userDropDown = (isAuthenticated : boolean) => {
        if(isAuthenticated) {
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
        return(
                <div>
                                        {/* display navbar with the flexibility of scaling across the screen dimension change */}
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={this.props.colorsObj.navBarStyle}>
                        <div className="container">
                                            {/* NavLink is a react utility used for Routing and not loading a new refreshed page,
                                            rather loading the last rendered page with any new updates in components */}
                        <NavLink className="nav-link l2" exact to="/" style={this.props.colorsObj.navLinkStyle}>
                                                            {/* Font Awesome CDN used to display Globe giphy in Navbar Brand */}
                            <i className="fa fa-globe" 
                                aria-hidden="true">
                            </i> 
                            fLipkart News App
                        </NavLink>
                                                {/* NavLink is used to choose the currently selected link. Currently selected link
                                                has a className "active" in it  */}
                        <NavLink className="nav-link l1" exact to="/info" style={this.props.colorsObj.navLinkStyle}>
                            Team
                        </NavLink>
                        
                        <button className="navbar-toggler" 
                            type="button" 
                            data-toggle="collapse" 
                                                // Upon Decrement of ScreenWidth the data target of items too be shown in the button
                                                // click has an id of "navbarNavDropdown"
                            data-target="#navbarNavDropdown" 
                            aria-controls="navbarNavDropdown" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                            >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ml-auto">
                                                {/* Show Country List and Categories in two different list items of navbar */}
                                <Route path="/" exact render={() => (
                                        <CountryNavItem 
                                        country={this.props.countrycode} 
                                        countryChangeHandler={this.countryChangeHandler}
                                         />
                                )}/>
                                <Route path="/" exact render={() => (
                                        <CategoryNavItem 
                                        category={this.props.newscategory} 
                                        categoryChangeHandler={this.categoryChangeHandler}  
                                    />
                                )}/>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" 
                                        href="#/" id="navbarDropdown"
                                        role="button" 
                                        data-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false">
                                            <i className="fa fa-user" aria-hidden="true"  style={this.props.colorsObj.dropdown}></i>
                                    </a>
                                    {this.userDropDown(this.props.user)}
                                </li>
                                <li className="nav-item dropdown">
                                        
                                        {this.props.darkMode ? <i className="fa fa-sun-o" aria-hidden="true" onClick={this.darkModeFlipper}></i>:
                                            <i className="fa fa-moon-o" aria-hidden="true" onClick={this.darkModeFlipper}></i>
}
                                </li>
                            </ul>
                        </div>
                        <div>
                            
                        </div>
                        {/* <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="customSwitches"/>
                            <label class="custom-control-label" for="customSwitches">Toggle this switch element</label>
                        </div> */}
                        </div>
                    </nav>
                </div>
        );
    }
}

//------------------------Redux Section----------------------------------------------------------------------------
//mapStateToProps helps in getting the updated state from store in Header.js as props

const mapStateToProps = (state: RootState , ownProps: any) => {
    return {
      countrycode : state.newsFetchReducer.countrycode,
      newscategory : state.newsFetchReducer.newscategory,
      user : state.auth.userId,
      darkMode: state.appModeReducer.darkMode,
      colorsObj: state.appModeReducer.colorsObj,
      cookies: ownProps.cookies
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = (dispatch: any) => {
    return {
        newsHandler : () => dispatch(actionTypes.newsHandler()),
        countryChangeHandler : (newCountry:string) => dispatch(actionTypes.countryChangeHandler(newCountry)),
        categoryChangeHandler : (newCategory:string) => dispatch(actionTypes.categoryChangeHandler(newCategory)),
        flipDarkMode: () => dispatch(actionTypes.flipDarkMode()),
        authSuccess : (email : string) => dispatch(authSuccess(email))
    }
  };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.


export default connect(mapStateToProps, mapDispatchToProps)(Header);