import React from 'react';
import Card from 'react-bootstrap/Card'

const NewsCard = (props) => {
    return (
        <Card variant="outlined" style={{ width: '18rem' }}>
        <Card.Img variant="left" src={props.img}/>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                {props.description}
            </Card.Text>
        </Card.Body>
        </Card>
    )
}
export default NewsCard;