import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, register, updateUserProfile} from "../actions/userActions";
import {userDetailsReducer} from "../reducers/userReducer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {RESET_USER_UPDATE_PROFILE} from "../constants/userConstants";
import {listMyOrders} from "../actions/orderActions";
import {LinkContainer} from "react-router-bootstrap";


function ProfileScreen() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('')


    const location = useLocation()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails// user login returns loading, userInfo , error

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin// user login returns loading, userInfo , error

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile// is to make sure update passed successfully

    const orderListMy = useSelector(state => state.orderListMy)
    // loadingOrders: This variable will hold the value of the loading property from the orderListMy object.
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy


    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({
                        type: RESET_USER_UPDATE_PROFILE
                    }
                )
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name) // setting name which is ten displayed
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('register')
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            console.log('updating')
        }
    }


    return (
        <Row>
            <Col md={3}>
                <h2> User Profile</h2>

                {error && <Message variant='danger'>{error}</Message>}
                {message ? <Message variant='danger'>{message}</Message> : null}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder={'Enter Name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Adress (USERNAME)</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder={'Enter Email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder={'Enter Password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder={'Confirm Password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>UPDATE</Button>

                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader/>
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}/>
                                )}</td>
                                <td>{order.isDelivered ? <i className='fas fa-check' style={{color: 'green'}}/> : (
                                    <i className='fas fa-times' style={{color: 'red'}}/>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen