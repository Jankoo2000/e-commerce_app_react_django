import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { LinkContainer } from "react-router-bootstrap";

function LoginScreen() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const locationInfo = useLocation();
  const redirectPath = locationInfo.search ? locationInfo.search.split('=')[1] : '/';

  const dispatcher = useDispatch();
  const userLoginInfo = useSelector(state => state.userLogin);
  const { error: loginError, loading: isLoading, userInfo: userInformation } = userLoginInfo;

  const navigator = useNavigate();

  useEffect(() => {
    if (userInformation) {
      navigator(redirectPath);
    }
  }, [navigator, userInformation, redirectPath]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatcher(login(emailValue, passwordValue));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loginError && <Message variant="danger">{loginError}</Message>}
      {isLoading && <Loader />}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="py-3 mt-3">
          SIGN IN
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirectPath ? `/register?redirect=${redirectPath}` : "/register"} style={{ textDecoration: "none" }}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
