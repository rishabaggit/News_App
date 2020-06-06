// Purpose: To display the list of Categories for which News is Available, in the Dropdown present in Navbar
//---------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in CategoryNavItem.js

import React from 'react';
import {newsCategories} from '../../../constants'

//---------------------------------------------------------------------------------------------------------

const CategoryNavItem = (props) => {
    return (
        <li className="nav-item" style = {{color:'black'}}>                
                                {/* Display a navbar item for the select with the option in the dropdown for
                                    all the Available Categories which news is Available.  Invoke countryChangeHandler
                                    if option changed for the country. */}
            <select value={props.category} onChange={props.categoryChangeHandler} className="dropdown custom-select check">
            {newsCategories.map((cat) => {
                    return(
                    <option key={cat} value={cat}>
                        {cat}
                    </option>)
            })}
            </select>
        </li>

    );
}
//----------------------Default Export as CategoryNavItem--------------------------------------------------

export default CategoryNavItem;

//--------------------------------------------------------------------------------------------------------
