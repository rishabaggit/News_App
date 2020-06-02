// PURPOSE: Component Called From DisplayNewsCard.js and Reposible for Rendering each News Article in a card visible in the home page

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in NewsCard.js

import React from 'react';
import "./NewsCard.css"

//-----------------------------------------------------------------------------------------------------------------


const NewsCard = (props) => {
    return (

        <div className="column thumbnail col-lg-4 col-md-6 col-xs-1pic">
                            {/* Bootstrap used for scaling issues on various window sizes ranging from XS to Large 
                                Container Used For Using only a fixed part of Window and Not Letting Card Flow Across the Screen*/}
            <div className="container" >
                            {/* onClick function acts an a listener and renders the news in a new tab upon article clicking
                            To open a new window on every call of window.open(), used the special value _blank for windowName. */}
                <div className="card" onClick={() => {
                    var win = window.open(props.url, '_blank');
                    win.focus();
                }}>
                    {/* <object data={props.img} height="175" id="hello"> */}
                        <img src={props.img} alt="" id="hello" height="175"/>
                    {/* </object> */}

                        <div className="container">
                            <p className="title">{props.title}</p>
                            <p className="maxLines">{props.description}...</p>
                        </div>
                </div>
                
            </div>
            
        </div>
        
    )
}


//---------------------------------------------------------------------------------------------------------------
//Exporting as default NewsCard

export default NewsCard;

//---------------------------------------------------------------------------------------------------------------