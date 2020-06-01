import React from 'react';
import './Info.css'
import Pic1 from '../../resources/Harshavardhana.jpeg'
import Pic2 from '../../resources/Mudreka.png'
import errorSign from '../../resources/ErrorSign.png'
import Person from './Person.js'

const Info = (props) => {
    return (
        // <h1>INFO</h1
        <React.Fragment>
<div className='row'>
    <div className ='rowContainer'>
        <Person name='Harshavardhana Shrirup' imageSrc = {Pic1} title='SDE Intern at Flipkart'/>
        <Person name='Mudreka Arif' imageSrc = {Pic2} title='SDE Intern at Flipkart'/>
        <Person name='Pranjal Tripathi' imageSrc = {errorSign} title='SDE Intern at Flipkart'/>
    </div>
</div>
</React.Fragment>
    );
}
export default Info;