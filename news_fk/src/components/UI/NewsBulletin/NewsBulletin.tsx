// PURPOSE: This Component is Mainly used for Styling Purpose to Show a Central Banner displaying "FLIPKART NEWS BULLETIN"

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in NewsBulletin.js

import React from 'react';
import './NewsBulletin.css';
//-----------------------------------------------------------------------------------------------------------------

const NewsBulletin = () => {
    return (
        <div className="container">
                                        {/* Display a Banner With Top Margin-10
                                            Container is used to pad content inside of them */}
            <div className="jumbotron mt-10">
                                        {/* Use of FontAwesome in order to Display the Globe Icon in the Flipkart News Bulletin. 
                                        Font Awesone CDN link defined in index.html */}
                <h1><i className="fa fa-globe color" aria-hidden="true"></i> Flipkart News Bulletin </h1>
                <p className="color">NEWS Covered From All Corners of the World, Aspiring One Stop NEWS Destination!!</p> 
            </div>
        </div>
    );
}

//----------------------------------------Export as default NewsBulletin.js---------------------------------------

export default NewsBulletin;

//-----------------------------------------------------------------------------------------------------------------
