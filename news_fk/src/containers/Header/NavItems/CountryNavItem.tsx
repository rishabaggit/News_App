import React from 'react';
import { countriesAndCategories } from '../../../constants'

interface CountryNavItemProps {
    country: string;
    countryChangeHandler: (event: React.FormEvent<HTMLSelectElement>) => void;
}
const CountryNavItem: React.FC<CountryNavItemProps> = (props) => {
    return (
        <li className="nav-item">
            <select value={props.country} onChange={props.countryChangeHandler}
                className="dropdown custom-select check1">
                {
                    Object.keys(countriesAndCategories).map((countryName) => {
                        return (
                            <option key={countryName} value={countriesAndCategories[countryName].code}>
                                {countriesAndCategories[countryName].country}
                            </option>)
                    })}
            </select>
        </li>
    );
}
export default CountryNavItem;