import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom';
import {countryList,newsCategories} from '../../constants'
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
                            <li className="nav-item">
                                
                                <select value={props.country} onChange={props.countryChangeHandler} className="dropdown custom-select">
                                {countryList.map((cnt) => {
                                    return(
                                    <option key={cnt.country} value={cnt.code}>
                                        {cnt.country}
                                    </option>)
                                })}
                                </select>
                            </li>
    
                            <li className="nav-item">
                                
                                <select value={props.category} onChange={props.categoryChangeHandler} className="dropdown custom-select">
                                {newsCategories.map((cat) => {
                                        return(
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>)
                                })}
                                </select>
                            </li>
                        </ul>
                    </div>
                    </div>
                    
                </nav>
            </div>
        // <div className="header">
        //     <div className="header-heading">
        //         <h1>FK NEWS</h1>
        //     </div>
        //     <div className="header-dropdowns">
        //         <select value={props.country} onChange={props.countryChangeHandler} className="select-css">
        //             {countryList.map((cnt) => {
        //                 return(
        //                 <option key={cnt.country} value={cnt.code}>
        //                     {cnt.country}
        //                 </option>)
        //             })}
        //         </select>
        //         <select value={props.category} onChange={props.categoryChangeHandler} className="select-css">
        //             {newsCategories.map((cat) => {
        //                     return(
        //                     <option key={cat} value={cat}>
        //                         {cat}
        //                     </option>)
        //             })}
        //         </select>
        //     </div>
        // </div>
    );
}

export default Header;