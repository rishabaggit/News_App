// PURPOSE: Display the Header/NavBar of the Page responsible for displaying links, category and country change option and brand name.
// Called from App.js
//---------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in Header.js

import React, { Component } from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';
import CountryNavItem from './NavItems/CountryNavItem.js'
import CategoryNavItem from './NavItems/CategoryNavItem.js'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

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
    render() {
        return(
                <div>
                                        {/* display navbar with the flexibility of scaling across the screen dimension change */}
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" >
                        <div className="container">
                                            {/* NavLink is a react utility used for Routing and not loading a new refreshed page,
                                            rather loading the last rendered page with any new updates in components */}
                        <NavLink className="nav-link l2" exact to="/">
                                                            {/* Font Awesome CDN used to display Globe giphy in Navbar Brand */}
                            <i className="fa fa-globe" 
                                aria-hidden="true">
                            </i> 
                            fLipkart News App
                        </NavLink>
                                                {/* NavLink is used to choose the currently selected link. Currently selected link
                                                has a className "active" in it  */}
                        <NavLink className="nav-link l1" exact to="/info">
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
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ml-auto">
                                                {/* Show Country List and Categories in two different list items of navbar */}
                                <CountryNavItem 
                                    country={this.props.countrycode} 
                                    countryChangeHandler={this.countryChangeHandler} 
                                    className="checking" />
                                <CategoryNavItem 
                                    category={this.props.newscategory} 
                                    categoryChangeHandler={this.categoryChangeHandler}  
                                    className="checking"/>
                            </ul>
                        </div>
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
      countrycode : state.countrycode,
      newscategory : state.newscategory,
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

const mapDispatchToProps = dispatch => {
    return {
        newsHandler : () => dispatch(actionTypes.newsHandler()),
        countryChangeHandler : (newCountry) => dispatch(actionTypes.countryChangeHandler(newCountry)),
        categoryChangeHandler : (newCategory) => dispatch(actionTypes.categoryChangeHandler(newCategory))
    }
  };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.


export default connect(mapStateToProps, mapDispatchToProps)(Header);