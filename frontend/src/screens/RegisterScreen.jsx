import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { register } from "../reducers/registerReducer";
import FormContainer from "../components/shared/FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUserDetail } from "../api/fetchUser";
import { login } from "../reducers/userReducers";

const RegisterScreen = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Correct usage of useNavigate

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

//   const redirect = location.search ? location.search.split("=")[1] : "/";
const redirect='/login';
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userDetail } = userRegister;

  useEffect(() => {
    if (userDetail) {
      navigate(redirect); // Use navigate function to redirect
    }
  }, [navigate, userDetail, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUserDetail({ name: name, email: email, password: password })).then((action) => {
        register(name, email, password);
       
      });
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Register</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" style={{ marginTop: '10px' }}>
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account?{" "}
            {/* <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
              Login
            </Link> */}
            <Link to="/login">
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
