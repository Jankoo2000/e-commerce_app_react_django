import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Col, Form, Row} from "react-bootstrap";
import {getUserDetails, updateUser} from "../actions/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";


function UserEditScreen() {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {id: userId} = useParams()
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails// user login returns loading, userInfo , error
    // userDetails is empty

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate// user login returns loading, userInfo , error

    const dispatch = useDispatch()

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET,
            })
            navigate('/admin/userlist')
        } else {

            if (!user.name || user._id !== Number(userId)) {
                // console.log('ZUPA')// may be infinite loop in case  user._id !== userId nuber !== string
                dispatch(getUserDetails(userId))

            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)

            }
        }
    }, [userId, user, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('ID userEditScreen: ' + userId)
        dispatch(updateUser({
            _id: user._id,
            name: name,
            email: email,
            isAdmin: isAdmin,
        }))

    }


    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>EDIT USER</h1>
                {loadingUpdate && <Loader/> }
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                    (
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
                                <Form.Label>Email Address (USERNAME)</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder={'Enter Email'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isAdmin'>
                                <Form.Label>Password</Form.Label>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary'>UPDATE</Button>

                        </Form>
                    )}


            </FormContainer>
        </div>

    )
}

export default UserEditScreen