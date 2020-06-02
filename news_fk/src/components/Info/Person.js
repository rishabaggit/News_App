import React from 'react'
import './Info.css'

const Person = (props) => {
    return (
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

export default Person;