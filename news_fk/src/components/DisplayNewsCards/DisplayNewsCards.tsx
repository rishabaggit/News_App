// PURPOSE: Component is called in App.js and is responsible for Rendering of News Articles stored in newsarticles array

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in DisplayNewsCards.js

import React from 'react';
import NewsCard from './NewsCard/NewsCard'
import "./DisplayNewsCards.css"
import { ModeColors } from 'colors';

//-----------------------------------------------------------------------------------------------------------------
interface DisplayNewsCardsProps{
    userId?: string;
    cookies: any;
    colorsObj: ModeColors;
    articles:any;
}
interface newsitemI{
    urlToImage: any;
    url:string;
    title:string;
    description:string;
}


class DisplayNewsCards extends React.Component<DisplayNewsCardsProps>  {
    render() {
    return(
        <div className="container">
                    {/* Row is used for storing columns in it coming from NewsCard
                    Container is used to pad content inside of them */}
            <div className="row">
                
                    {
                                    // articles is alias name for news_articles array in store
                         this.props.articles.map((newsitem : newsitemI ,idx : number) => {
                                    //  Calling NewsCard for Every Element of articles Array as newsitem with uniques key idx,
                                    //  passing in props the image, url, title, description and key attached with speicfic news artice.
                                    // console.log(props.cookies);
                            return <NewsCard
                                img={newsitem.urlToImage}
                                url={newsitem.url}
                                title={newsitem.title}
                                description={newsitem.description}
                                key={idx}
                                cookies={this.props.cookies}
                                colorsObj = {this.props.colorsObj}
                            />
                        })

                    }                
            </div>
        </div>
        
    );
    }
 }
 

export default DisplayNewsCards;

//---------------------------------------------------------------------------------------------------------------