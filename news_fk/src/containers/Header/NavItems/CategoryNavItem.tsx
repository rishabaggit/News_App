import React from 'react';
import { countriesAndCategories } from '../../../constants'

interface CategoryNavItemProps {
    category: string;
    country: string;
    categoryChangeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
}

const CategoryNavItem: React.FC<CategoryNavItemProps> = (props) => {
    return (
        <li className="nav-item" style={{ color: 'black' }}>
            <select value={props.category} onChange={props.categoryChangeHandler} className="dropdown custom-select check">
                {
                    countriesAndCategories[Object.keys(countriesAndCategories).find(key => countriesAndCategories[key].code === props.country)].categories.map((cat) => {
                        return (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>)
                    })}
            </select>
        </li>

    );
}

export default CategoryNavItem;