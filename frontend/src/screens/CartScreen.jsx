import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, decreaseCartQuantity, clearCart, getTotals } from '../reducers/cartReducer';
import { Carousel, Row, Col, Image, Button, ListGroup, Card } from "react-bootstrap";
import "../styles/cart.css";  

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetail } = userLogin;

  useEffect(() => {
    dispatch(getTotals());
  }, [cart.cartItems, dispatch]);

  const { cartItems } = cart;

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCartQuantity(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const checkout = () => {
    if (userDetail) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="text-center">Shopping Cart</h2>

      {/* Carousel at the top */}
      {cartItems.length > 0 && (
        <Carousel className="cart-carousel mb-4">
          {cartItems.map((item) => (
            <Carousel.Item key={item._id}>
              <Image className="d-block w-100 cart-carousel-img" src={item.image} alt={item.name} fluid />
              <Carousel.Caption>
                <h5>{item.name}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {cartItems.length === 0 ? (
        <div className="cart-empty text-center">
          <p>Your cart is currently empty</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <>
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => (
              <ListGroup.Item key={cartItem._id} className="cart-item">
                <Row className="align-items-center">
                  {/* Product Image */}
                  <Col md={2}>
                    <Image src={cartItem.image} alt={cartItem.name} fluid className="cart-image" />
                  </Col>

                  {/* Product Details */}
                  <Col md={3}>
                    <h5>{cartItem.name}</h5>
                    <p>{cartItem.description}</p>
                    <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(cartItem)}>Remove</Button>
                  </Col>

                  {/* Price */}
                  <Col md={2} className="text-center">
                    <strong>${cartItem.price}</strong>
                  </Col>

                  {/* Quantity Selector */}
                  <Col md={3} className="d-flex align-items-center">
                    <Button variant="outline-secondary" onClick={() => handleDecreaseCart(cartItem)}>-</Button>
                    <span className="mx-2">{cartItem.cartQuantity}</span>
                    <Button variant="outline-secondary" onClick={() => handleIncreaseCart(cartItem)}>+</Button>
                  </Col>

                  {/* Total Price */}
                  <Col md={2} className="text-end">
                    <strong>${(cartItem.price * cartItem.cartQuantity).toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Cart Summary */}
          <Card className="cart-summary mt-4">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4 className="text-center">Cart Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Items</Col>
                  <Col>{cartItems.reduce((acc, item) => acc + item.cartQuantity, 0)}</Col>
                </Row>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${cart.cartTotalAmount.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button className="btn-danger w-100 mb-2" onClick={handleClearCart}>Clear Cart</Button>
                <Button
                  className="btn-success w-100"
                  disabled={cartItems.length === 0 || !userDetail}
                  onClick={checkout}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          {/* Continue Shopping */}
          <div className="text-center mt-3">
            <Link to="/" className="btn btn-outline-primary">Continue Shopping</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
