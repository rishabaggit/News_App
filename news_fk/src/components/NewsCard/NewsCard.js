import React from 'react';
import Card from 'react-bootstrap/Card'

const NewsCard = (props) => {
    return (
        <Card variant="outlined" style={{ width: '18rem' }}>
        <Card.Img variant="left" src="https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/05/26/Pictures/pune-lockdown-covid-19-day-62_62cf2c7e-9f1a-11ea-88a1-96031f43cf2a.jpg" />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
        </Card.Body>
        </Card>
    )
}

export default NewsCard;