import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { getOrderDetails, payOrder } from "../api/order";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const { userDetail } = useSelector((state) => state.userLogin); // Fetch user details from Redux
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch(getOrderDetails(orderId)); // Fetch order details again if order is not available
    }
  }, [dispatch, orderId, order, successPay]);

  useEffect(() => {
    if (!window.paypal) {
      const addPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
      };
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder({ orderId, paymentResult }));
  };

  // Ensure orderItems exists and calculate prices
  let itemsPrice = 0;
  let shippingPrice = order?.shippingPrice || 0;
  let taxPrice = order?.taxPrice || 0;
  let totalPrice = 0;

  if (order?.orderItems && order?.orderItems.length > 0) {
    itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    totalPrice = itemsPrice + shippingPrice + taxPrice;
  }

  // Fallback in case order is still undefined
  const shippingAddress = order?.shippingAddress || {};
  const userName = userDetail?.name || "N/A"; // Fetch from userLogin
  const userEmail = userDetail?.email || "N/A"; // Fetch from userLogin

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order {order?._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {userName}
              </p>
              <p>
                <strong>Email: </strong> {userEmail}
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress?.address || "N/A"}, {shippingAddress?.city || "N/A"},
                {shippingAddress?.postalcode || "N/A"}, {shippingAddress?.country || "N/A"}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order?.paymentMethod || "N/A"}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <a href={`/product/${item.product}`}>{item.name}</a>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice.toFixed(2)}</Col> {/* Display the calculated items price */}
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col> {/* Shipping price */}
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice.toFixed(2)}</Col> {/* Tax price */}
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice.toFixed(2)}</Col> {/* Total price */}
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
