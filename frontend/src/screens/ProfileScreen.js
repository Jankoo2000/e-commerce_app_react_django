import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, register, updateUserProfile} from "../actions/userActions";
import {userDetailsReducer} from "../reducers/userReducer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";


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


    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({
                        type: USER_UPDATE_PROFILE_RESET
                    }
                )
                dispatch(getUserDetails('profile'))
                console.log('got users profile s details')
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
            </Col>
        </Row>
    )
}

export default ProfileScreen