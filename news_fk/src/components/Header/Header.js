import React from 'react';

const Header = (props) => {
    const countries =[
        {country:"Australia" ,code:"au"},
        {country:"Argentina" ,code:"ar"},
        {country:"Belgium" ,code:"be"},
        {country:"Canada" ,code:"ca"},
        {country:"China" ,code:"cn"},
        {country:"Egypt" ,code:"eg"},
        {country:"France" ,code:"fr"},
        {country:"Germany" ,code:"de"},
        {country:"Italy" ,code:"it"},
        {country:"India" ,code:"in"},
        {country:"Japan" ,code:"jp"},
        {country:"Malaysia" ,code:"my"},
        {country:"Mexico" ,code:"mx"},
        {country:"Russia" ,code:"ru"},
        {country:"Sweden" ,code:"se"},
        {country:"Switzerland" ,code:"ch"},
        {country:"UK" ,code:"gb"},
        {country:"USA" ,code:"us"}
    ]
    return(
        <div>
            <div className="header-heading">
                <h1>FK NEWS</h1>
            </div>
            <div className="header-dropdowns">
                <select value={props.currcountry.country}>
                    {countries.map((cnt) => {
                        return(
                        <option key={cnt.code} value={cnt.country}>
                            {cnt.country}
                        </option>)
                    })}
                </select>
            </div>
        </div>
    );
}

export default Header;