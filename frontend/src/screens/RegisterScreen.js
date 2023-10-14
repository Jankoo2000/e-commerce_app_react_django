import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Col, Form, Row} from "react-bootstrap";


function RegisterScreen() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('')


    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userLogin// user login returns loading, userInfo , error

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userLogin, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('register')
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }


    return (
        <FormContainer>
            <h1>SIGN IN</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message ? <Message variant='danger'>{message}</Message> : null}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
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
                        required
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

                <Button type='submit' variant='primary'>REGISTER</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?
                    <Link to={'/login'}
                          style={{textDecoration: 'none'}}>
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen