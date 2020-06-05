// PURPOSE: Component is called in App.js and is responsible for Rendering of News Articles stored in newsarticles array

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in DisplayNewsCards.js

import React from 'react';
import NewsCard from './NewsCard/NewsCard'
import "./DisplayNewsCards.css"

//-----------------------------------------------------------------------------------------------------------------

const DisplayNewsCards = (props) => {
    return(
        <div className="container">
                    {/* Row is used for storing columns in it coming from NewsCard
                    Container is used to pad content inside of them */}
            <div className="row">
                
                    {
                                    // articles is alias name for news_articles array in store
                         props.articles.map((newsitem,idx) => {
                                    //  Calling NewsCard for Every Element of articles Array as newsitem with uniques key idx,
                                    //  passing in props the image, url, title, description and key attached with speicfic news artice.
                                    // console.log(props.cookies);
                            return <NewsCard
                                img={newsitem.urlToImage}
                                url={newsitem.url}
                                title={newsitem.title}
                                description={newsitem.description}
                                key={idx}
                                cookies={props.cookies}
                            />
                        })

                    }                
            </div>
        </div>
        
    );
 }
 
 //---------------------------------------------------------------------------------------------------------------
//Exporting as default DisplayNewsCards

export default DisplayNewsCards;

//---------------------------------------------------------------------------------------------------------------