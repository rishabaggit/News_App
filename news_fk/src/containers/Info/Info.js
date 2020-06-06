//PURPOSE: Render the MEET THE TEAM page with the intention to show the info of team members and apply basic routing within our app

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in Info.js

import React from 'react';
import './Info.css'
import Pic1 from '../../resources/Harshavardhana.jpeg'
import Pic2 from '../../resources/Mudreka.png'
import Pic3 from '../../resources/Pranjal.jpg'
import Person from './Person.js'
//-----------------------------------------------------------------------------------------------------------------

const Info = (props) => {
    return (
        // <h1>INFO</h1
        <React.Fragment>
                    {/* Return a React Fragment consiting of rows of info of team member that are rendered through <Person> */}
            <div className="container">
                <div className="row top-margin">
                                                {/* Row class mainly used to hold columns that are rendered through "Person"
                                                    Containers are used to pad the content inside of them */}
                    <Person name='Harshavardhana' imageSrc = {Pic1} title='SDE Intern at Flipkart'/>
                    <Person name='Mudreka Arif' imageSrc = {Pic2} title='SDE Intern at Flipkart'/>
                    <Person name='Pranjal Tripathi' imageSrc = {Pic3} title='SDE Intern at Flipkart'/>
                </div>
            </div>

</React.Fragment>
    );
}

//---------------------------------------Export Info as Default-------------------------------------------------------
export default Info;
//--------------------------------------------------------------------------------------------------------------------