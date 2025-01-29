import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { savePaymentMethod } from "../reducers/cartReducer";
import CheckoutStep from "../components/shared/CheckoutStep";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("paypal");

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping"); // Redirect to shipping if no shipping address
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder"); // Navigate to place order
  };

  return (
    <>
      <CheckoutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"} // Ensure it's checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Cash On Delivery"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"} // Corrected this line
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </>
  );
};

export default PaymentScreen;
