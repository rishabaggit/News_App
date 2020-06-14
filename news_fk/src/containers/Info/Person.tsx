import './Info.css'
import React from 'react'
import { ModeColors } from 'colors';

interface PersonProps {
    colorsObj: ModeColors;
    imageSrc: string;
    name: string;
    title: string;
    url: string;
}
const Person: React.FC<PersonProps> = (props) => {
    return (
        <div className='column col-md-4 col-sm-6 col-xs-12'>
            <div className='card'
                onClick={() => {
                    var win = window.open(props.url, '_blank');
                    win.focus();
                }}
                style={{ backgroundColor: props.colorsObj.cardColor }}>
                <img className='image' src={props.imageSrc} alt='' />
                <div className='container'>
                    <h2 style={props.colorsObj.textStyleHigh}>
                        {props.name}
                    </h2>
                    <p className='title' style={props.colorsObj.textStyleLow}>
                        {props.title}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Person;
