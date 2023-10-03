import {Col, Container, Row} from "react-bootstrap";


function FormContainer({children}) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                {/*extra small 12 units, medium screen 6 units*/}
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>

        </Container>

    )
}

export default FormContainer