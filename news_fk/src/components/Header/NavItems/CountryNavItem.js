import React from 'react';
import {countryList} from '../../../constants'
const CountryNavItem = (props) => {
    return (
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

    );
}

export default CountryNavItem;