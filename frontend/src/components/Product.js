import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from './Rating';
import {Link} from 'react-router-dom';

const Product = ({product}) => {
    const {_id, image, name, rating, numReviews, price} = product;
    const productLink = `/product/${_id}`;

    const renderProductLink = (content) => <Link to={productLink}>{content}</Link>;

    return (
        <Card className="my-3 p-3 rounded">
            {renderProductLink(<Card.Img src={image} alt={name}/>)}
            <Card.Body>
                {renderProductLink(
                    <Card.Title as="div">
                        <strong>{name}</strong>
                    </Card.Title>
                )}
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={rating} text={`${numReviews} reviews`} color="#f8e825"/>
                    </div>
                </Card.Text>
                <Card.Text as="h3">${price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;

