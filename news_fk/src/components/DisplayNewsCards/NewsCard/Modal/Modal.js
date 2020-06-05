import React from 'react';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon, WhatsappShareButton, WhatsappIcon} from 'react-share';



const Modal = (props) => {
    return (
        <div className="modal fade" id={props.url} tabindex="-1" role="dialog" aria-hidden="true">
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
                            <FacebookShareButton
                                url={props.url}>
                                <FacebookIcon
                                size={32}
                                round />
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={props.url}>
                                <TwitterIcon
                                size={32}
                                round />
                            </TwitterShareButton>
                            
                            <RedditShareButton
                                url={props.url}>
                                <RedditIcon
                                size={32}
                                round />
                            </RedditShareButton>

                            <WhatsappShareButton
                                url={props.url}>
                                <WhatsappIcon
                                size={32}
                                round />
                            </WhatsappShareButton>
                            
                                {/* <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURI(props.url)}`} class="fa fa-facebook-square"></a>
                                <a href="https://www.twitter.com" class="fa fa-twitter"></a>
                                <a href="https://www.linkedin.com" class="fa fa-linkedin-square"></a>
                                <a href="https://www.github.com" class="fa fa-github"></a> */}
                                
                            </p>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    
                </div>
                </div>
            </div>
        </div>

    );
}
export default Modal;