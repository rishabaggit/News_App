// Purpose: To display the list of Countries for which News is Available, in the Dropdown present in Navbar
//---------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in CountryNavItem.js

import React from 'react';
import {countryList} from '../../../constants'

//---------------------------------------------------------------------------------------------------------
interface CountryNavItemProps{
    country: any;
    countryChangeHandler: any;
}
const CountryNavItem: React.FC<CountryNavItemProps> = (props) => {
    return (
        <li className="nav-item">   
                                    {/* Display a navbar item for the select with the option in the dropdown for
                                    all the Available Countries for which news is Available.  Invoke countryChangeHandler
                                    if option changed for the country. */}
        <select value={props.country} onChange={props.countryChangeHandler} className="dropdown custom-select check1">
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

//----------------------Default Export as CountryNavItem--------------------------------------------------

export default CountryNavItem;

//--------------------------------------------------------------------------------------------------------