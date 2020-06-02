import React from 'react';
import './Info.css'
import Pic1 from '../../resources/Harshavardhana.jpeg'
import Pic2 from '../../resources/Mudreka.png'
import Pic3 from '../../resources/Pranjal.jpg'
import Person from './Person.js'

const Info = (props) => {
    return (
        // <h1>INFO</h1
        <React.Fragment>
        {/* <div className="container">
            <div className='row'>
                <div className ='rowContainer column'>
                    <Person name='Harshavardhana' imageSrc = {Pic1} title='SDE Intern at Flipkart'/>
                    <Person name='Mudreka Arif' imageSrc = {Pic2} title='SDE Intern at Flipkart'/>
                    <Person name='Pranjal Tripathi' imageSrc = {Pic3} title='SDE Intern at Flipkart'/>
                </div>
            </div>
        </div> */}
        <div className="container">
            <div className="row">
                <Person name='Harshavardhana' imageSrc = {Pic1} title='SDE Intern at Flipkart'/>
                <Person name='Mudreka Arif' imageSrc = {Pic2} title='SDE Intern at Flipkart'/>
                <Person name='Pranjal Tripathi' imageSrc = {Pic3} title='SDE Intern at Flipkart'/>
            </div>
        </div>

</React.Fragment>
    );
}
export default Info;