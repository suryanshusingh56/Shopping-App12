import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import CheckOutStep from "../components/shared/CheckoutStep";
import { createOrder } from "../api/order"; // Import createOrder action

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    console.log("Payment Method in Redux:", cart.paymentMethod);
  }, [cart.paymentMethod]);

  // Function to calculate decimal values
  const addDecimal = (num) => (Math.round(num * 100) / 100).toFixed(2);

  // Calculate prices
  const itemsPrice = cart.cartItems?.reduce(
    (acc, item) => acc + (item.price || 0) * (item.cartQuantity || 0),
    0
  ) || 0;

  const shippingPrice = itemsPrice < 500 ? 0 : 50;
  const taxPrice = addDecimal(0.15 * itemsPrice);
  const totalPrice = (itemsPrice + shippingPrice + Number(taxPrice)).toFixed(2);

  const placeOrderHandler = () => {
    if (cart.cartItems.length === 0) {
      console.log("Cart is empty!");
      return;
    }

    const orderItems = cart.cartItems
      .map((item) => {
        if (!item.price || !item.cartQuantity) {
          console.error("Missing price or quantity for item:", item);
          return null;
        }
        return {
          name: item.name,
          qty: item.cartQuantity,
          image: item.image,
          price: item.price,
          product: item._id,
        };
      })
      .filter((item) => item !== null);

    if (orderItems.length === 0) {
      console.log("No valid items to place in order.");
      return;
    }

    dispatch(
      createOrder({
        orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
      })
    );
  };

  // Redirect after successful order creation
  useEffect(() => {
    if (success && order) {
console.log(cart.paymentMethod)
      if (cart.paymentMethod === "Cash On Delivery") {
        navigate(`/order/cod/${order._id}`); // Redirect to COD confirmation page
      } else {
        navigate(`/order/${order._id}`); // Redirect to payment page for PayPal
      }
    }
  }, [navigate, success, order, cart.paymentMethod]); // Make sure `orderCreate` state is being used here

  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalcode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>{cart.paymentMethod || "Not Selected"}</strong>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          {item.cartQuantity} X ${item.price?.toFixed(2) || 0} = $
                          {(item.cartQuantity * item.price || 0).toFixed(2)}
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
                  <Col>${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;