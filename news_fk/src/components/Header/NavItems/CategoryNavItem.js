import React from 'react';
import {newsCategories} from '../../../constants'
const CategoryNavItem = (props) => {
    return (
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

    );
}

export default CategoryNavItem;