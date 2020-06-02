import React, { Component } from 'react';
import './Header.css';
import {NavLink} from 'react-router-dom';
import CountryNavItem from './NavItems/CountryNavItem.js'
import CategoryNavItem from './NavItems/CategoryNavItem.js'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

class Header extends Component {
    countryChangeHandler = (event) => {
        this.props.countryChangeHandler(event.target.value);
        this.props.newsHandler();
    }
    categoryChangeHandler = (event) => {
        this.props.categoryChangeHandler(event.target.value);
        this.props.newsHandler();
    }
    render() {
        return(
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" >
                        <div className="container">
                        <NavLink className="nav-link l2" exact to="/">
                            <i className="fa fa-globe" 
                                aria-hidden="true">
                            </i> 
                            fLipkart News App
                        </NavLink>
                        <NavLink className="nav-link l1" exact to="/info">
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

const mapStateToProps = state => {
    return {
      countrycode : state.countrycode,
      newscategory : state.newscategory,
    };
  };
const mapDispatchToProps = dispatch => {
    return {
        newsHandler : () => dispatch(actionTypes.newsHandler()),
        countryChangeHandler : (newCountry) => dispatch(actionTypes.countryChangeHandler(newCountry)),
        categoryChangeHandler : (newCategory) => dispatch(actionTypes.categoryChangeHandler(newCategory))
    }
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Header);