import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { login } from "../reducers/userReducers";
import FormContainer from "../components/shared/FormContainer";
import { fetchUserDetail } from "../api/fetchUser";
import store from '../store'


const LoginScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    // const redirect = location.search ? location.search.split("=")[1] : "/";
    const redirect='/';


    // store.dispatch(fetchUserDetail())
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userDetail } = userLogin;

    useEffect(() => {

        // dispatch()
        if (userDetail && Object.keys(userDetail).length > 0) {
            navigate(redirect);
        }
    }, [navigate, userDetail, redirect]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(fetchUserDetail({ email: email, password: password })).then((action) => {
            login(email, password);
        });

    };

    return (
        <>
            <FormContainer>
                <h1>SIGN IN</h1>
                {error && <Message varient="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ marginBottom: '10px' }} // Add margin bottom to password input
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" style={{ marginTop: '10px' }}> {/* Add margin top to button */}
                        SIGN IN
                    </Button>
                </Form>
                <Row>
                    <Col>
                        New Customer?{" "}
                        <Link to= "/register">
                            Register
                        </Link>
                        {/* <Link to={redirect ? `register?redirect=${redirect}` : "/register"}>
                            Register
                        </Link> */}

                    </Col>
                </Row>
            </FormContainer>

        </>
    );
};

export default LoginScreen;
