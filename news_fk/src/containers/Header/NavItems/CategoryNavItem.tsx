import React from 'react';
import { newsCategories } from '../../../constants'

interface CategoryNavItemProps {
    category: string;
    categoryChangeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
}

const CategoryNavItem: React.FC<CategoryNavItemProps> = (props) => {
    return (
        <li className="nav-item" style={{ color: 'black' }}>
            <select value={props.category} onChange={props.categoryChangeHandler} className="dropdown custom-select check">
                {newsCategories.map((cat) => {
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