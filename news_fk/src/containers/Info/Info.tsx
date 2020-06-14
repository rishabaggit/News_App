import React from 'react';
import './Info.css'
import Pic1 from '../../resources/Harshavardhana.jpeg'
import Pic2 from '../../resources/Mudreka.png'
import Pic3 from '../../resources/Pranjal.jpg'
import Person from './Person'
import { ModeColors } from 'colors';

interface InfoProps {
    colorsObj: ModeColors;
}
const Info: React.FC<InfoProps> = (props) => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="row top-margin">
                    <Person
                        name='Harshavardhana'
                        imageSrc={Pic1} title='SDE Intern at Flipkart'
                        colorsObj={props.colorsObj}
                        url='https://www.linkedin.com/in/harshavardhana-shrirup-b944341a9/'
                    />
                    <Person
                        name='Mudreka Arif'
                        imageSrc={Pic2} title='SDE Intern at Flipkart'
                        colorsObj={props.colorsObj}
                        url='https://www.linkedin.com/in/mudreka-arif-5533b5162/'
                    />
                    <Person
                        name='Pranjal Tripathi'
                        imageSrc={Pic3} title='SDE Intern at Flipkart'
                        colorsObj={props.colorsObj}
                        url='https://www.linkedin.com/in/pranjal-tripathi/'
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Info;