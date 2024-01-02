import FormContainer from "../components/FormContainer";
import {useState} from "react";
import {Button, Form, FormGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../actions/cartActions";
import {useNavigate} from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submitted')
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    };
    // why in other cases useEffect? maybe async??

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''} // if local Storage is empty
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>

                <FormGroup controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>

                <FormGroup controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postalcode'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>

                <FormGroup controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </FormGroup>

                <Button type='submit' variant={'primary'}>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen