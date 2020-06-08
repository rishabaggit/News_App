// PURPOSE: Component is called in App.js and is responsible for Rendering of News Articles stored in newsarticles array

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in DisplayNewsCards.js

import React from 'react';
import NewsCardDB from './NewsCard/NewsCardDB'
import NewsCard from './NewsCard/NewsCard'
import {connect} from 'react-redux';
import "./DisplayNewsCards.css"

//-----------------------------------------------------------------------------------------------------------------

class DisplayNewsCards extends React.Component {
    render() {
        if(this.props.userId) {
            return(
                <div className="container">
                            {/* Row is used for storing columns in it coming from NewsCard
                            Container is used to pad content inside of them */}
                    <div className="row">
                        
                            {
                                            // articles is alias name for news_articles array in store
                                 this.props.articles.map((newsitem,idx) => {
                                            //  Calling NewsCard for Every Element of articles Array as newsitem with uniques key idx,
                                            //  passing in props the image, url, title, description and key attached with speicfic news artice.
                                            // console.log(props.cookies);
                                    return <NewsCardDB
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
    return(
        <div className="container">
                    {/* Row is used for storing columns in it coming from NewsCard
                    Container is used to pad content inside of them */}
            <div className="row">
                
                    {
                                    // articles is alias name for news_articles array in store
                         this.props.articles.map((newsitem,idx) => {
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
 
 //---------------------------------------------------------------------------------------------------------------
//Exporting as default DisplayNewsCards

const mapStateToProps = state => {
    return {
      userId : state.auth.userId
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

// const mapDispatchToProps = dispatch => {
//     return {
//     }
//   };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, null)(DisplayNewsCards);

//---------------------------------------------------------------------------------------------------------------