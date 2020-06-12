// PURPOSE: Component Called From DisplayNewsCard.js and Reposible for Rendering each News Article in a card visible in the home page

import React from 'react';
import "./NewsCard.css"
import Modal from './Modal/Modal';
import { ModeColors } from 'colors';
import { Cookies } from 'react-cookie';

interface NewsCardProps {
    cookies: Cookies;
    url: string;
    colorsObj: ModeColors;
    img: any;
    title: string;
    description: string;
    Liked: boolean;
    unlikePost: (newsItem) => void;
    likePost: (newsItem) => void;
    newsItem: Object;
}


class NewsCard extends React.Component<NewsCardProps> {
    render() {
        return (
            <div className="column thumbnail col-lg-4 col-md-6 col-xs-1pic">
                {/* Bootstrap used for scaling issues on various window sizes ranging from XS to Large 
                                Container Used For Using only a fixed part of Window and Not Letting Card Flow Across the Screen*/}
                <div className="container" >
                    {/* onClick function acts an a listener and renders the news in a new tab upon article clicking
                            To open a new window on every call of window.open(), used the special value _blank for windowName. */}
                    <div className="card" style={{ backgroundColor: this.props.colorsObj.cardColor }} onDoubleClick={this.props.Liked ? () => this.props.unlikePost(this.props.newsItem) : () => this.props.likePost(this.props.newsItem)}>
                        {/* <object data={props.img} height="175" id="hello"> */}
                        {/* <img src={props.img} alt="" id="hello" height="175"/> */}
                        <div className="iconoverimage">
                            <img src={this.props.img} alt="" id="hello" height="175" style={{ opacity: this.props.colorsObj.opacity }} />
                            {this.props.Liked ? <i className="far fa-heart" id={'#' + this.props.url} onClick={() => this.props.unlikePost(this.props.newsItem)}></i> :
                                <i className="fas fa-heart" id={'#' + this.props.url} onClick={() => this.props.likePost(this.props.newsItem)}></i>}

                        </div>
                        {/* </object> */}

                        <div className="container">
                            <p className="title" style={this.props.colorsObj.textStyleHigh}>{this.props.title}</p>
                            <p className="maxLines" style={this.props.colorsObj.textStyleMedium}>{this.props.description}...</p>

                            <button type="button"
                                className="btn  mb-2"
                                data-toggle="modal"
                                data-target={'#' + this.props.url}
                                style={{ backgroundColor: this.props.colorsObj.cardButtonColor }}
                            >
                                <span style={this.props.colorsObj.textStyleMedium}>Share</span>
                            </button>

                            <button type="button"
                                className="btn mb-2"
                                style={{ backgroundColor: this.props.colorsObj.cardButtonColor }}
                                onClick={() => {
                                    var win = window.open(this.props.url, '_blank');
                                    win.focus();
                                }}>
                                <span style={this.props.colorsObj.textStyleMedium}>Read More</span>
                            </button>
                            <Modal {...this.props} />
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}


export default NewsCard;

//---------------------------------------------------------------------------------------------------------------