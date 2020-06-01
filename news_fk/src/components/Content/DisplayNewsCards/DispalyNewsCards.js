import React from 'react';
import NewsCard from './NewsCard/NewsCard'
import "./DisplayNewsCards.css"
const DisplayNewsCards = (props) => {
    return(
        <div className="container">
            <div className="row">
                
                    {
                        props.articles.map((newsitem,idx) => {
                            return <NewsCard
                                img={newsitem.urlToImage}
                                url={newsitem.url}
                                title={newsitem.title}
                                description={newsitem.description}
                                key={idx}
                            />
                        })

                    }                
            </div>
        </div>
        
    );
 }
 export default DisplayNewsCards;