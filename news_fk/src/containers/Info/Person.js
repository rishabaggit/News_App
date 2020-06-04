//PURPOSE: Shall be displaying each member info, called once for each team member through Info.js
//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in Person.js
import React from 'react'
import './Info.css'

//-----------------------------------------------------------------------------------------------------------------

const Person = (props) => {
    return (
                    // A column  in a row is assigned for each of the Person.
                    // Scaling issues resolved for screen width through col- md, sm, xs
                    // Each column shall contain a card with Image, Name of Team Member
    <div className='column col-md-4 col-sm-6 col-xs-12'>
        <div className='card'>
        <img className='image'  src={props.imageSrc} alt=''/>
            <div className='container'>
                <h2>{props.name}</h2>
                <p className='title'>{props.title}</p>
            </div>
        </div>
    </div>
    );
}

//-------------------------------------Export as default Person------------------------------------------------------
export default Person;

//-------------------------------------------------------------------------------------------------------------------