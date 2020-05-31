import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import CountryNavItem from '../NavItems/CountryNavItem.js'
import CategoryNavItem from '../NavItems/CategoryNavItem.js'
const Header = (props) => {
    return(

            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" >
                    <div className="container">
                    <Link className="navbar-brand" to="/"><i className="fa fa-globe" aria-hidden="true"></i> fLipkart News App</Link>
                    <Link className="nav-link" to="/info">Info</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <CountryNavItem country={props.country} countryChangeHandler={props.countryChangeHandler} />
                            <CategoryNavItem category={props.category} categoryChangeHandler={props.categoryChangeHandler} />
                        </ul>
                    </div>
                    </div>
                    
                </nav>
            </div>
    );
}

export default Header;