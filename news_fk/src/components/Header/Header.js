import React from 'react';
import './Header.css'
import {countryList,newsCategories} from '../../constants'
const Header = (props) => {
    return(

            <div>
            
                <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top" >
                    <div className="container">
                    <a className="navbar-brand" href="#"><i className="fa fa-globe" aria-hidden="true"></i> fLipkart News App</a>
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
              
    
                <div className="container">
                    <div className="jumbotron mt-10">
                        <h1><i className="fa fa-globe" aria-hidden="true"></i> Flipkart News Bulletin </h1>
                        <p>NEWS Covered From All Corners of the Worlds, Aspiring One Stop NEWS Destination!!</p> 
                    </div>
                </div>
    
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