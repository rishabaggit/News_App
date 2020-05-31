import React from 'react';
// import Card from 'react-bootstrap/Card'
import "./NewsCard.css"
import errorSign from '../../resources/ImageNotFound.png'


const NewsCard = (props) => {
    return (

        <div className="column thumbnail col-lg-4 col-md-6 col-xs-1pic">
            
            <div className="container" >
                <div className="card" onClick={() => {
                    var win = window.open(props.url, '_blank');
                    win.focus();
                }}
                
                >
                    
                    <object data={props.img} height="175" id="hello">
                        <img src={errorSign} alt="Not Found" id="hello" height="175"/>
                    </object>
                    <div className="container">
                        <p className="title">{props.title}</p>
                        <p className="maxLines">{props.description}...</p>
                    </div>
                </div>
                {/* <div className="overlay" style={{visibility: 'hidden'}}>
                    <div className="text">Read More</div>
                </div> */}
            </div>
            
        </div>
        // <Card variant="outlined" style={{ width: '18rem' }}>
        // <Card.Img variant="left" src={props.img}/>
        // <Card.Body>
        //     <Card.Title>{props.title}</Card.Title>
        //     <Card.Text>
        //         {props.description}
        //     </Card.Text>
        // </Card.Body>
        // </Card>
    )
}
export default NewsCard;