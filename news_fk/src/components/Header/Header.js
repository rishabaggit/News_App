import React from 'react';
import './Header.css'
import {countryList,newsCategories} from '../../constants'
const Header = (props) => {
    return(
        <div className="header">
            <div className="header-heading">
                <h1>FK NEWS</h1>
            </div>
            <div className="header-dropdowns">
                <select value={props.country} onChange={props.countryChangeHandler} className="select-css">
                    {countryList.map((cnt) => {
                        return(
                        <option key={cnt.country} value={cnt.code}>
                            {cnt.country}
                        </option>)
                    })}
                </select>
                <select value={props.category} onChange={props.categoryChangeHandler} className="select-css">
                    {newsCategories.map((cat) => {
                            return(
                            <option key={cat} value={cat}>
                                {cat}
                            </option>)
                    })}
                </select>
            </div>
        </div>
    );
}

export default Header;