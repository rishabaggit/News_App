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
                <div className="card">
                    {/* <object data={props.img} height="175" id="hello"> */}
                        <img src={props.img} alt="" id="hello" height="175"/>
                    {/* </object> */}

                        <div className="container">
                            <p className="title">{props.title}</p>
                            <p className="maxLines">{props.description}...</p>
                            
                            <button type="button" class="btn  mb-2" data-toggle="modal" data-target="#exampleModal"><span>Share</span></button>
                            <button type="button" class="btn mb-2"  onClick={() => {
                                    var win = window.open(props.url, '_blank');
                                    win.focus();
                                }}>
                                <span>Read More</span>   
                            </button>

                            {/* ---------------------------------MODAL BODY----------------------------------------- */}

                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" style={{textAlign:'center'}} >{props.title}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="container-fluid">
                                            <div className="center">
                                                <img alt='' style={{height:250, marginBottom:10}} src={props.img}/>
                                            </div>

                                            <div className="center">
                                                <p>{props.description}</p>
                                            </div>
                                                <p>
                                                    <a href="https://www.facebook.com" class="fa fa-facebook-square"></a>
                                                    <a href="https://www.twitter.com" class="fa fa-twitter"></a>
                                                    <a href="https://www.linkedin.com" class="fa fa-linkedin-square"></a>
                                                    <a href="https://www.github.com" class="fa fa-github"></a>
                                                    
                                                </p>
                                            
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        
                                    </div>
                                    </div>
                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------ */}
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