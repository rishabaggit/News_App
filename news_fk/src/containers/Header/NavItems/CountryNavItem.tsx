import React from 'react';
import { countryList } from '../../../constants'

interface CountryNavItemProps {
    country: string;
    countryChangeHandler: any;
}
const CountryNavItem: React.FC<CountryNavItemProps> = (props) => {
    return (
        <li className="nav-item">
            <select value={props.country} onChange={props.countryChangeHandler}
                className="dropdown custom-select check1">
                {countryList.map((cnt) => {
                    return (
                        <option key={cnt.country} value={cnt.code}>
                            {cnt.country}
                        </option>)
                })}
            </select>
        </li>
    );
}
export default CountryNavItem;