//PURPOSE: Shall be displaying each member info, called once for each team member through Info.js
//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in Person.js
import React from 'react'
import './Info.css'

//-----------------------------------------------------------------------------------------------------------------
interface PersonProps{
    colorsObj : any;
    imageSrc : string;
    name : string;
    title: string;
}
const Person:React.FC<PersonProps> = (props) => {
    return (
                    // A column  in a row is assigned for each of the Person.
                    // Scaling issues resolved for screen width through col- md, sm, xs
                    // Each column shall contain a card with Image, Name of Team Member
    <div className='column col-md-4 col-sm-6 col-xs-12'>
        <div className='card' style={{backgroundColor: props.colorsObj.cardColor}}>
        <img className='image'  src={props.imageSrc} alt=''/>
            <div className='container'>
                <h2 style={props.colorsObj.textStyleHigh}>{props.name}</h2>
                <p className='title' style={props.colorsObj.textStyleLow}>{props.title}</p>
            </div>
        </div>
    </div>
    );
}

//-------------------------------------Export as default Person------------------------------------------------------
export default Person;

//-------------------------------------------------------------------------------------------------------------------