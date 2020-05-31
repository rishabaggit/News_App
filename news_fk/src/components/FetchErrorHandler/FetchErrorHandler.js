import React from 'react';
import errorSign from '../../ErrorSign.png'
import './FetchErrorHandler.css'
const FetchErrorHandler = (props) => {
    return (
        /*<h1>ERROR HANDLER</h1>*/
        <div className='Container'>
            <img className='Image' src={errorSign}/>
        </div>
        
    );
}
export default FetchErrorHandler;