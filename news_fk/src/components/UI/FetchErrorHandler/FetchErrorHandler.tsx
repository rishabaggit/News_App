// PURPOSE: Fetch an Error Page in Case if the of Error such as network disconnectivity. Called from Within App.js

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in FetchErrorHandler.js

import React from 'react';
import errorSign from '../../../resources/ErrorSign.png'
import './FetchErrorHandler.css'

//-----------------------------------------------------------------------------------------------------------------
interface FetchErrorHandlerProps{
}

const FetchErrorHandler: React.FC<FetchErrorHandlerProps> = () => {
    return (
                    // Container is used to pad content inside of them
                    // Image from within Resources folder used in case if unable to load page
        <div className='Container'>
            <img className='Image' src={errorSign} alt={"ERROR"}/>
        </div>
        
    );
}

//---------------------------------------------------------------------------------------------------------------
//Exporting as default FetchErrorHandler

export default FetchErrorHandler;

//---------------------------------------------------------------------------------------------------------------