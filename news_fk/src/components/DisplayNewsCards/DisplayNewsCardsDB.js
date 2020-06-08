// PURPOSE: Component is called in App.js and is responsible for Rendering of News Articles stored in newsarticles array

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in DisplayNewsCards.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import NewsCardDev from './NewsCard/NewsCardDB';
import {connect} from 'react-redux';
import "./DisplayNewsCards.css";
import {userget , addLike , removeLike}from '../UserData/FirestoreUtil';
import FullScreenLoader from '../UI/FullScreenLoader/FullScreenLoader';
//-----------------------------------------------------------------------------------------------------------------
class DisplayNewsCards extends React.Component {
    componentDidMount() {
        if(this.props.userId === null) {
            return <Redirect to="/signin" />;
        }
        else {
            this.setState({loading : true})
            userget(this.props.userId).then(
                doc => {
                    if(doc && doc.liked) {
                        this.setState({LikedArray : doc.liked,
                            loading : false
                        });
                    }
                    else {
                        this.setState({LikedArray : [], loading : false});
                    }
                }
            )
            .catch(error => console.log(error));
        }
    }
    state = {
        loading : true,
        LikedArray : null
    }
    likePost = (newsItem) => {
        let likedPosts = [...this.state.LikedArray , newsItem];
        this.setState({LikedArray : likedPosts})
        addLike(this.props.userId ,newsItem);
    }
    unlikePost = (newsItem) => {
        let likedPosts = this.state.LikedArray.filter(obj => obj.url !== newsItem.url)
        this.setState({LikedArray : likedPosts})
        removeLike(this.props.userId ,newsItem);
    }
    render() {
        if(!this.props.userId) {
            return <Redirect to="/signin" />;
        }
        if(this.state.loading) {
            return <FullScreenLoader/>;
        }
        if(this.state.LikedArray) {
            return(
                <div className="container">
                    <div className="row">
                            {
                                 this.props.articles.map((newsitem,idx) => {
                                    return <NewsCardDev
                                        img={newsitem.urlToImage}
                                        url={newsitem.url}
                                        title={newsitem.title}
                                        description={newsitem.description}
                                        key={idx}
                                        colorsObj = {this.props.colorsObj}
                                        Liked = {this.state.LikedArray.find(obj => obj.url === newsitem.url)}
                                        newsItem={newsitem}
                                        likePost = {this.likePost}
                                        unlikePost = {this.unlikePost}
                                    />
                                })
        
                            }                
                    </div>
                </div>
                
            );
            }
            else {
                return <FullScreenLoader/>;
        }
    }
 }
 
 //---------------------------------------------------------------------------------------------------------------
//Exporting as default DisplayNewsCards

const mapStateToProps = (state) => {
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