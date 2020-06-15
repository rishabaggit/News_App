import './FetchErrorHandler.css'
import React from 'react';
import errorSign from '../../../resources/ErrorSign.png'

const FetchErrorHandler = () => {
    return (
        <div className='Container'>
            <img className='Image' src={errorSign} alt={"ERROR"} />
        </div>

    );
}

export default FetchErrorHandler;
