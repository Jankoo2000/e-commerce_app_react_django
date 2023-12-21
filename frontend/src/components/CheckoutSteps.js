

import React from "react";
import {Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

function CheckoutSteps({step1, step2, step3, step4}) {
    const stepInfo = [
        {step: 'login', label: 'Login', isEnabled: step1},
        {step: 'shipping', label: 'Shipping', isEnabled: step2},
        {step: 'payment', label: 'Payment', isEnabled: step3},
        {step: 'placeorder', label: 'Place Order', isEnabled: step4}
    ];

    const renderStep = ({step, label, isEnabled}) => (
        <Nav.Item key={step}>
            {isEnabled ? (
                <LinkContainer to={`/${step}`}>
                    <Nav.Link>{label}</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>{label}</Nav.Link>
            )}
        </Nav.Item>
    );

    return (
        <Nav className='justify-content-md-center mb-4'>
            {stepInfo.map((step) => renderStep(step))}
        </Nav>
    );
}

export default CheckoutSteps;
