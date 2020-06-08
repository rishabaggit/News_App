/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
// PURPOSE: Display the Header/NavBar of the Page responsible for displaying links, category and country change option and brand name.
// Called from App.js
//---------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in Header.js

import React, { Component } from 'react';
import './Header.css';
import {Link , NavLink} from 'react-router-dom';
import CountryNavItem from './NavItems/CountryNavItem.js';
import CategoryNavItem from './NavItems/CategoryNavItem.js';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import {Route} from 'react-router-dom';


//---------------------------------------------------------------------------------------------------------

class Header extends Component {

	//function registered for listening to event and further for changing country in background and fetching news for same
    countryChangeHandler = (event) => {
    	this.props.countryChangeHandler(event.target.value);
    	this.props.newsHandler();
    }
    //function registered for listening to event and further for changing category in background and fetching news for same
    categoryChangeHandler = (event) => {
    	this.props.categoryChangeHandler(event.target.value);
    	this.props.newsHandler();
    }
    userDropDown = (isAuthenticated) => {
    	if(isAuthenticated) {
    		return (
    			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
    				<Link className="dropdown-item" exact to="/userProfile">My Profile</Link>
    				<Link className="dropdown-item" exact to="/likedPosts">Liked Posts</Link>
    				<div className="dropdown-divider"></div>
    				<Link className="dropdown-item" exact to="/logout">Logout</Link>
    			</div>
    		);
    	}
    	else {
    		return (
    			<div className="dropdown-menu" aria-labelledby="navbarDropdown">
    				<Link className="dropdown-item" exact to="/login">Log In</Link>
    				<Link className="dropdown-item" exact to="/signin">Sign In</Link>
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
    									className="checking"
    									colorsObj={this.props.colorsObj} />
    							)}/>
    							<Route path="/" exact render={() => (
    								<CategoryNavItem 
    									category={this.props.newscategory} 
    									categoryChangeHandler={this.categoryChangeHandler}  
    									className="checking"/>
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
                                        
    								{this.props.darkMode ? <i className="fa fa-sun-o" aria-hidden="true" onClick={(checked) => this.props.flipDarkMode()}></i>:
    									<i className="fa fa-moon-o" aria-hidden="true" onClick={(checked) => this.props.flipDarkMode()}></i>
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

const mapStateToProps = state => {
	return {
		countrycode : state.newsFetchReducer.countrycode,
		newscategory : state.newsFetchReducer.newscategory,
		user : state.auth.userId,
		darkMode: state.appModeReducer.darkMode,
		colorsObj: state.appModeReducer.colorsObj
	};
};

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = dispatch => {
	return {
		newsHandler : () => dispatch(actionTypes.newsHandler()),
		countryChangeHandler : (newCountry) => dispatch(actionTypes.countryChangeHandler(newCountry)),
		categoryChangeHandler : (newCategory) => dispatch(actionTypes.categoryChangeHandler(newCategory)),
		flipDarkMode: () => dispatch(actionTypes.flipDarkMode())
	};
};
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.


export default connect(mapStateToProps, mapDispatchToProps)(Header);