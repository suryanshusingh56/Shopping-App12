import React, { useEffect, useState } from 'react';

import Rating from '../components/Rating';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Image, ListGroupItem, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import fetchProductDetails from '../api/fetchProductDetails';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../reducers/cartReducer';





function ProductDetails({ params }) {
  // const [qty, setQty] = useState(1);
  const { id } = useParams();
  const productDetail = useSelector(state => state.productDetail)
  const { loading, error, product } = productDetail;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductDetails(id));

  }, [dispatch, id]);
  const navigate = useNavigate();
  const addToCartHandler = () => {
    dispatch(addToCart(product))
    navigate('/cart/');
  }
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to="/" className='btn btn-light'>
        <i className="fas fa-arrow-left"></i>
        &nbsp;Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={`out of ${product.numReviews} Reviews`} />
            </ListGroupItem>
            <ListGroupItem>
              Price: ${product.price}
            </ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroupItem>
            <Row>
              <Col> Status :</Col>
              <Col>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Col>
            </Row>
          </ListGroupItem>
          {/* {product.countInStock > 0 && (
            <ListGroupItem>
              <Row>
                <Col>Qty</Col>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Row>
            </ListGroupItem>
          )} */}

          <ListGroupItem className="mt-3">
            <Button
              className="btn-block long-btn"
              type="button"
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </Button>
          </ListGroupItem>
        </Col>
      </Row>
    </div >
  );
}

export default ProductDetails;
