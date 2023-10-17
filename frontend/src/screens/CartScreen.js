import React, {useEffect} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import {addToCart, removeFromCart} from "../actions/cartActions";
import {Button, Col, Form, Image, ListGroup, Row} from "react-bootstrap";


function CartScreen({history}) {
    const dispatch = useDispatch()
    // const productId = useParams() // object
    const {id} = useParams();
    const navigate = useNavigate();

    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1 // location seach is begginign with '?' mark


    const cart = useSelector(state => state.cart) // cart: cartReducer,
    const {cartItems} = cart // const cartReducer = (state = {cartItems: []}, action)


    useEffect(() => {
        if (id) {
            // Dispatch the addToCart action, which is asynchronous
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (id) => {
        console.log('remove: ', id)
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        // eslint-disable-next-line
        // navigate('/login?redirect=shipping')
        navigate('/shipping')
    }


    // bootstrap grid has 12 columns
    // child column is also divided by 12 slices
    // highth is not divided because by slices
    return (
        <Row>
            <Col md={8}>
                <h1> Shoppping Cart </h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}
                                              style={{textDecoration: 'none'}}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty}
                                            // onChange={(e) => setQty(10)}>
                                                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>

                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup>
                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkOutHandler}
                        >
                            Procced to CHECKOUT
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>

        </Row>)
}

export default CartScreen