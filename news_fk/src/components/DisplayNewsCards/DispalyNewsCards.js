import React from 'react';
import NewsCard from '../NewsCard/NewsCard'
const DisplayNewsCards = (props) => {
    return(
        props.articles.map((newsitem,idx) => {
            return <NewsCard
                img={newsitem.urlToImage}
                url={newsitem.url}
                title={newsitem.title}
                description={newsitem.description}
                key={idx}
            />
        })
    );
 }
 export default DisplayNewsCards;