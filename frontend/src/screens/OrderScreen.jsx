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

  const { userInfo } = useSelector((state) => state.userLogin); // Get user details from Redux
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
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

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {userInfo?.name || "N/A"}
              </p>
              <p>
                <strong>Email: </strong> {userInfo?.email || "N/A"}
              </p>
              <p>
                <strong>Address: </strong>
                {userInfo?.address?.street || "N/A"}, {userInfo?.address?.city || "N/A"},
                {userInfo?.address?.postalcode || "N/A"}, {userInfo?.address?.country || "N/A"}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems?.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <a href={`/product/${item.product}`}>{item.name}</a>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
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
