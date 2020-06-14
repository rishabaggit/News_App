import React from 'react';
import {
    TwitterShareButton,
    TwitterIcon,
    FacebookShareButton,
    FacebookIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';

interface ModalProps {
    url: string;
    description: string;
    title: string;
    img: string;
}

const Modal: React.FC<ModalProps> = (props) => {
    return (
        <div className="modal fade" id={props.url}
            role="dialog" aria-hidden="true">

            <div className="modal-dialog modal-lg"
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{ textAlign: 'center' }} >{props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="center">
                                <img alt='' style={{ height: 250, marginBottom: 10 }} src={props.img} />
                            </div>

                            <div className="center">
                                <p>{props.description}</p>
                            </div>
                            <p className="center">
                                <FacebookShareButton
                                    url={props.url}
                                >
                                    <FacebookIcon
                                        size={32}
                                        round />
                                </FacebookShareButton>

                                <TwitterShareButton
                                    url={props.url}
                                    style={{ marginLeft: '3px' }}>
                                    <TwitterIcon
                                        size={32}
                                        round />
                                </TwitterShareButton>

                                <RedditShareButton
                                    url={props.url}
                                    style={{ marginLeft: '3px' }}>
                                    <RedditIcon
                                        size={32}
                                        round />
                                </RedditShareButton>

                                <WhatsappShareButton
                                    url={props.url}
                                    style={{ marginLeft: '3px' }}>
                                    <WhatsappIcon
                                        size={32}
                                        round />
                                </WhatsappShareButton>

                            </p>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>

    );
}
export default Modal;