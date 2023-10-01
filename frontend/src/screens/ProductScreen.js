import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, Row, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProductsDetails} from "../actions/productActions";
import {useDispatch, useSelector} from "react-redux";

function ProductScreen() {
    // HOOKS need clousere
    // const [qty, setQty] = useState(1); => [1, setState_function_reference]
    // <button onClick={() => setQty(qty + 1)}>Increment</button>
    // when count is changed component is automaticlly re-rendered
    const [qty, setQty] = useState(1);


    const {id} = useParams(); // to access dynamit route value
    const navigate = useNavigate();



    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails) // it allows you to select and access data from your Redux store within a React functional component.
    const {loading, error, product} = productDetails

    // When you provide an empty dependency array ([]) as the second argument to useEffect, it tells React that the
    // effect should run only once, immediately after the initial render of the component
    useEffect(() => {
        dispatch(listProductsDetails(id))
    }, [dispatch, id]);


    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            {/*<h1>{id}</h1>*/}
            {/*<h1>{qty}</h1>*/}
            <Link to='/' className='btn btn-light my-3'>Go back </Link>
            {loading ?
                <Loader/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                color={'#f8e825'}/>
                                    </ListGroup.Item>


                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>


                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>


                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Stock:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        {/* eslint-disable-next-line react/jsx-no-undef */}
                                                        <Form.Control as="select" value={qty}
                                                                      // onChange={(e) => setQty(10)}>
                                                                      onChange={(e) => setQty(e.target.value)}>

                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup>
                                            <Button
                                                onClick={addToCartHandler}
                                                className='btn-block'
                                                disabled={product.countInStock === 0}
                                                type='button'>Add to Cart
                                            </Button>
                                        </ListGroup>
                                    </ListGroup>
                                </Card>
                            </Col>

                        </Row>
                    )
            }


        </div>
    );
}


export default ProductScreen