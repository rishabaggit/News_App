// PURPOSE: Component Called From DisplayNewsCard.js and Reposible for Rendering each News Article in a card visible in the home page

//-----------------------------------------------------------------------------------------------------------------
// Importing a named module or parameter to be used in NewsCard.js

import React from 'react';
import "./NewsCard.css"
import {connect} from 'react-redux';
import Modal from './Modal/Modal';
import {userget , addLike , removeLike}from '../../UserData/FirestoreUtil';
//-----------------------------------------------------------------------------------------------------------------

class NewsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLiked: ((this.props.cookies).get('Like')).includes(this.props.url)
            isLiked : false
        };
    }
    likePost = () => {
        // (this.props.cookies).set('Like',[...(this.props.cookies).get('Like'),this.props.url])
        addLike(this.props.userId , this.props.url);
        this.setState({
            isLiked: true
        })
        
    }
    unlikePost = () => {
        removeLike(this.props.userId , this.props.url)
        this.setState({
            isLiked: false
        })
    }
       
        
    // }
    componentDidMount() {
        if(this.props.userId === null) {
            console.log('PLease sign in')
        }
        else {
            userget(this.props.userId).then(
                doc => {
                    console.log(doc);
                    if(doc && doc.liked) {
                        this.setState({isLiked : doc.liked.includes(this.props.url)});
                    }
                }
            )
            .catch(error => console.log(error));
        }
    }
    

    render() {
        return (
            <div className="column thumbnail col-lg-4 col-md-6 col-xs-1pic">
                            {/* Bootstrap used for scaling issues on various window sizes ranging from XS to Large 
                                Container Used For Using only a fixed part of Window and Not Letting Card Flow Across the Screen*/}
            <div className="container" >
                            {/* onClick function acts an a listener and renders the news in a new tab upon article clicking
                            To open a new window on every call of window.open(), used the special value _blank for windowName. */}
                <div className="card" style={{backgroundColor: this.props.colorsObj.cardColor}} onDoubleClick={ this.state.isLiked ? () => this.unlikePost() : () => this.likePost()}>
                    {/* <object data={props.img} height="175" id="hello"> */}
                        {/* <img src={props.img} alt="" id="hello" height="175"/> */}
                        <div className="iconoverimage">
                                <img src={this.props.img} alt="" id="hello" height="175" style = {{opacity: this.props.colorsObj.opacity}}/>
                                {this.state.isLiked ? <i className="far fa-heart" id={'#' + this.props.url} onClick={()=> this.unlikePost()}></i>: 
                                                <i className="fas fa-heart" id={'#' + this.props.url}  onClick={()=> this.likePost()}></i> }
                                
                            </div>
                    {/* </object> */}

                        <div className="container">
                            <p className="title" style={this.props.colorsObj.textStyleHigh}>{this.props.title}</p>
                            <p className="maxLines" style={this.props.colorsObj.textStyleMedium}>{this.props.description}...</p>
                            
                            <button type="button" 
                                className="btn  mb-2" 
                                data-toggle="modal" 
                                data-target={'#' + this.props.url}
                                style={{backgroundColor: this.props.colorsObj.cardButtonColor}}
                                elevation >
                                    <span style={this.props.colorsObj.textStyleMedium}>Share</span>
                            </button>

                            <button type="button" 
                                className="btn mb-2"
                                style={{backgroundColor: this.props.colorsObj.cardButtonColor}}
                                onClick={() => {
                                    var win = window.open(this.props.url, '_blank');
                                    win.focus();
                                }}>
                                <span style={this.props.colorsObj.textStyleMedium}>Read More</span>   
                            </button>
                            <Modal {...this.props}/>
                        </div>
                </div>
                
            </div>
            
        </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      userId : state.auth.userId,
      darkMode: state.appModeReducer.darkMode,
      colorsObj: state.appModeReducer.colorsObj
    };
  };

//mapDispatchToProps() is a utility which will help your component to fire an action event

// const mapDispatchToProps = dispatch => {
//     return {
//     }
//   };
  
//-----------------------------------------------------------------------------------------------------------------
//Using Default Export as App with Connect being an higher order component which provides data to Component and functions it can dispatch to store.

export default connect(mapStateToProps, null)(NewsCard);

//---------------------------------------------------------------------------------------------------------------