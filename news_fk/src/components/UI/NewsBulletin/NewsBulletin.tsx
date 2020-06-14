import React from 'react';
import './NewsBulletin.css';

const NewsBulletin = (props: any) => {
    if (props.darkMode) {
        return (
            <div className="container">
                <div className="jumbotron1 jumbotron mt-10">
                    <h1 className="color2"><i className="fa fa-globe color" aria-hidden="true"></i> Flipkart News Bulletin </h1>
                    <p className="color2">NEWS Covered From All Corners of the World, Aspiring One Stop NEWS Destination!!</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="jumbotron2 jumbotron mt-10">
                    <h1 className="color1"><i className="fa fa-globe color" aria-hidden="true"></i> Flipkart News Bulletin </h1>
                    <p className="color1">NEWS Covered From All Corners of the World, Aspiring One Stop NEWS Destination!!</p>
                </div>
            </div>
        );
    }

}

export default NewsBulletin;
