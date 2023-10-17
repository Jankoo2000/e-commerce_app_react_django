import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {Button, Col, Form} from "react-bootstrap";
import {savePaymentMethod} from "../actions/cartActions";


function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>

                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen